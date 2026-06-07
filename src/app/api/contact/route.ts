import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Contact service is not configured.' }, { status: 503 });
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/contact_messages`, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      service,
      message,
      source: 'website',
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Could not save contact message.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
