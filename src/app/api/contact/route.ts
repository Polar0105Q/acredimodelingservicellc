import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendBrevoEmail({
  apiKey,
  senderName,
  senderEmail,
  to,
  replyTo,
  subject,
  htmlContent,
  textContent,
}: {
  apiKey: string;
  senderName: string;
  senderEmail: string;
  to: { email: string; name?: string }[];
  replyTo?: { email: string; name?: string };
  subject: string;
  htmlContent: string;
  textContent: string;
}) {
  return fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to,
      replyTo,
      subject,
      htmlContent,
      textContent,
    }),
  });
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const phone = payload.phone?.trim() || null;
  const service = payload.service?.trim();
  const message = payload.message?.trim();

  if (!name || !email || !service || !message || !emailPattern.test(email)) {
    return NextResponse.json({ error: 'Invalid contact form payload.' }, { status: 400 });
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;
  const contactFromName = process.env.CONTACT_FROM_NAME || 'AC Remodeling Service LLC';

  if (!brevoApiKey || !contactToEmail || !contactFromEmail) {
    return NextResponse.json({ error: 'Contact service is not configured.' }, { status: 503 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : 'Not provided';
  const safeService = escapeHtml(service);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  const adminResponse = await sendBrevoEmail({
    apiKey: brevoApiKey,
    senderName: contactFromName,
    senderEmail: contactFromEmail,
    to: [{ email: contactToEmail }],
    replyTo: {
      name,
      email,
    },
    subject: `New website lead: ${service}`,
    htmlContent: `
        <h2>New website contact request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Service:</strong> ${safeService}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    textContent: [
      'New website contact request',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Service: ${service}`,
      '',
      message,
    ].join('\n'),
  });

  if (!adminResponse.ok) {
    const errorText = await adminResponse.text();
    console.error('Brevo admin contact send failed', adminResponse.status, errorText);
    return NextResponse.json({ error: 'Could not send contact message.' }, { status: 502 });
  }

  const clientResponse = await sendBrevoEmail({
    apiKey: brevoApiKey,
    senderName: contactFromName,
    senderEmail: contactFromEmail,
    to: [{ email, name }],
    subject: 'We received your project request',
    htmlContent: `
      <h2>Thank you, ${safeName}</h2>
      <p>We received your request for <strong>${safeService}</strong>.</p>
      <p>Our team will review your message and contact you within 24 hours.</p>
      <p><strong>Your message:</strong></p>
      <p>${safeMessage}</p>
      <p>AC Remodeling Service LLC</p>
    `,
    textContent: [
      `Thank you, ${name}`,
      `We received your request for ${service}.`,
      'Our team will review your message and contact you within 24 hours.',
      '',
      'Your message:',
      message,
      '',
      'AC Remodeling Service LLC',
    ].join('\n'),
  });

  if (!clientResponse.ok) {
    const errorText = await clientResponse.text();
    console.error('Brevo client confirmation send failed', clientResponse.status, errorText);
  }

  return NextResponse.json({ ok: true });
}
