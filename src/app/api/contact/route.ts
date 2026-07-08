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

function emailShell({
  preheader,
  badge,
  heading,
  intro,
  content,
  footerNote,
}: {
  preheader: string;
  badge: string;
  heading: string;
  intro: string;
  content: string;
  footerNote: string;
}) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>${heading}</title>
      </head>
      <body style="margin:0;background:#f5f5f5;color:#111111;font-family:Arial,Helvetica,sans-serif;">
        <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">
          ${preheader}
        </span>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:24px;overflow:hidden;">
                <tr>
                  <td style="background:#111111;padding:28px 28px 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="vertical-align:middle;">
                          <div style="display:inline-block;background:#ffbd00;color:#050505;border-radius:14px;padding:10px 12px;font-size:18px;font-weight:800;letter-spacing:0.08em;">
                            AC
                          </div>
                        </td>
                        <td align="right" style="vertical-align:middle;">
                          <div style="color:#ffffff;font-size:15px;font-weight:700;line-height:1.3;">
                            AC Remodeling
                          </div>
                          <div style="color:#ffffff99;font-size:12px;line-height:1.5;">
                            Service LLC
                          </div>
                        </td>
                      </tr>
                    </table>
                    <div style="margin-top:26px;color:#ffbd00;font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;">
                      ${badge}
                    </div>
                    <h1 style="margin:10px 0 0;color:#ffffff;font-size:30px;line-height:1.08;font-weight:800;">
                      ${heading}
                    </h1>
                    <p style="margin:14px 0 0;color:#ffffffb3;font-size:15px;line-height:1.6;">
                      ${intro}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px;">
                    ${content}
                  </td>
                </tr>
                <tr>
                  <td style="padding:22px 28px;background:#fafafa;border-top:1px solid #e5e7eb;">
                    <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.6;">
                      ${footerNote}
                    </p>
                    <p style="margin:12px 0 0;color:#111111;font-size:12px;font-weight:700;">
                      Est. 2019 · Fully Insured
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #eeeeee;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;width:140px;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #eeeeee;color:#111111;font-size:15px;line-height:1.5;vertical-align:top;">
        ${value}
      </td>
    </tr>
  `;
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
  const adminHtml = emailShell({
    preheader: `New ${service} request from ${name}.`,
    badge: 'New Website Lead',
    heading: 'Project Request Received',
    intro:
      'A new customer submitted the contact form. Reply directly to this email to contact them.',
    content: `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
        ${detailRow('Name', safeName)}
        ${detailRow('Email', `<a href="mailto:${safeEmail}" style="color:#2e43f3;text-decoration:none;font-weight:700;">${safeEmail}</a>`)}
        ${detailRow('Phone', safePhone)}
        ${detailRow('Service', safeService)}
      </table>
      <div style="margin-top:24px;padding:20px;background:#f5f5f5;border:1px solid #e5e7eb;border-radius:16px;">
        <div style="color:#6b7280;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;">
          Message
        </div>
        <div style="color:#111111;font-size:15px;line-height:1.7;">
          ${safeMessage}
        </div>
      </div>
      <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:24px;">
        <tr>
          <td style="background:#2e43f3;border-radius:12px;">
            <a href="mailto:${safeEmail}" style="display:inline-block;padding:14px 20px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:800;">
              Reply to Customer
            </a>
          </td>
        </tr>
      </table>
    `,
    footerNote:
      'This notification was sent from the AC Remodeling Service LLC website contact form.',
  });
  const clientHtml = emailShell({
    preheader: 'We received your project request and will contact you within 24 hours.',
    badge: 'Request Confirmed',
    heading: `Thank You, ${safeName}`,
    intro:
      'We received your message. Our team will review your project details and contact you within 24 hours.',
    content: `
      <div style="padding:18px 20px;background:#fff8df;border:1px solid #f0c83f;border-radius:16px;color:#111111;font-size:15px;line-height:1.6;">
        Your request for <strong>${safeService}</strong> is now in our queue.
      </div>
      <div style="margin-top:24px;padding:20px;background:#f5f5f5;border:1px solid #e5e7eb;border-radius:16px;">
        <div style="color:#6b7280;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;">
          Your Message
        </div>
        <div style="color:#111111;font-size:15px;line-height:1.7;">
          ${safeMessage}
        </div>
      </div>
      <p style="margin:24px 0 0;color:#6b7280;font-size:14px;line-height:1.7;">
        If you need to add photos, measurements, or additional details, reply to this email and our team will receive it.
      </p>
    `,
    footerNote:
      'AC Remodeling Service LLC serves Sugar Mountain, Blowing Rock, Boone, Hickory, Morganton, and Lenoir.',
  });

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
    htmlContent: adminHtml,
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
    htmlContent: clientHtml,
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
