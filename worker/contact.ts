// Contact-form handler for POST /api/contact.
// Spam defenses: honeypot field ("website") + optional Turnstile when
// TURNSTILE_SECRET is configured. Email delivery via Resend.
//
// Environment variables (Workers project → Settings → Variables & Secrets):
//   RESEND_API_KEY   – secret; API key from resend.com
//   CONTACT_TO       – destination inbox (set in wrangler.toml [vars])
//   CONTACT_FROM     – verified sender (set in wrangler.toml [vars])
//   TURNSTILE_SECRET – optional secret; enables server-side Turnstile verification
import type { Env } from './index';

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function handleContact(request: Request, env: Env): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    // Malformed body / missing multipart content-type — treat as a bad request.
    return new Response(JSON.stringify({ error: 'invalid' }), { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (String(form.get('website') ?? '') !== '') {
    return new Response(null, { status: 204 });
  }

  const name = String(form.get('name') ?? '').trim().slice(0, 200);
  const email = String(form.get('email') ?? '').trim().slice(0, 200);
  const subject = String(form.get('subject') ?? '').trim().slice(0, 200);
  const message = String(form.get('message') ?? '').trim().slice(0, 5000);
  const locale = String(form.get('locale') ?? 'en').slice(0, 5);

  if (!name || !email || !subject || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'invalid' }), { status: 400 });
  }

  if (env.TURNSTILE_SECRET) {
    const token = String(form.get('cf-turnstile-response') ?? '');
    const verify = (await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET,
        response: token,
        remoteip: request.headers.get('cf-connecting-ip') ?? '',
      }),
    }).then((r) => r.json())) as { success: boolean };
    if (!verify.success) {
      return new Response(JSON.stringify({ error: 'turnstile' }), { status: 403 });
    }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `[churchbased.bible] ${subject}`,
      html: `<p><strong>Name:</strong> ${esc(name)}<br>
<strong>Email:</strong> ${esc(email)}<br>
<strong>Subject:</strong> ${esc(subject)}<br>
<strong>Locale:</strong> ${esc(locale)}</p>
<p>${esc(message).replace(/\n/g, '<br>')}</p>`,
    }),
  });

  if (!res.ok) {
    console.error('resend failed', res.status, await res.text());
    return new Response(JSON.stringify({ error: 'delivery' }), { status: 502 });
  }
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'content-type': 'application/json' },
  });
}
