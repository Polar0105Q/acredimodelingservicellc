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

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': brevoApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: contactFromName,
        email: contactFromEmail,
      },
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
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Brevo contact send failed', response.status, errorText);
    return NextResponse.json({ error: 'Could not send contact message.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
