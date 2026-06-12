// Vercel serverless function: receives an order from the website and emails
// the full order to the bakery owner. Kept fully self-contained (no local
// imports) so the Vercel Node runtime never has a module to fail to resolve.
//
// Env vars:
//   OWNER_EMAIL    — destination inbox (required)
//   APP_URL        — site origin, used as the FormSubmit Referer (optional)
//   RESEND_API_KEY — switches delivery to Resend when present (optional)
//   RESEND_FROM    — Resend from-address (optional)

type OrderItem = { sku: string; name: string; qty: number; unit_price: number };
export type OrderPayload = {
  website_order_id: string;
  placed_at: string;
  customer: { name: string; email: string; phone: string };
  fulfillment: { type: 'pickup' | 'delivery'; date: string; address: string | null };
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  notes: string;
};

type ChannelResult = { status: 'sent' | 'skipped' | 'failed'; detail?: string };

const money = (n: number) => `$${n.toFixed(2)}`;

function isValidPayload(p: unknown): p is OrderPayload {
  if (!p || typeof p !== 'object') return false;
  const o = p as Record<string, unknown>;
  const c = o.customer as Record<string, unknown> | undefined;
  const f = o.fulfillment as Record<string, unknown> | undefined;
  return (
    typeof o.website_order_id === 'string' &&
    typeof o.placed_at === 'string' &&
    !!c && typeof c.name === 'string' && typeof c.phone === 'string' &&
    !!f && (f.type === 'pickup' || f.type === 'delivery') && typeof f.date === 'string' &&
    Array.isArray(o.items) &&
    typeof o.total === 'number'
  );
}

function orderSummary(o: OrderPayload): string {
  const lines: string[] = [];
  lines.push(`New order from ${o.customer.name}`);
  lines.push('');
  for (const it of o.items) {
    lines.push(`  ${it.qty}x ${it.name} — ${money(it.unit_price * it.qty)}`);
  }
  lines.push('');
  lines.push(`Subtotal: ${money(o.subtotal)}`);
  if (o.delivery_fee) lines.push(`Delivery: ${money(o.delivery_fee)}`);
  lines.push(`Total: ${money(o.total)}`);
  lines.push('');
  lines.push(`Fulfillment: ${o.fulfillment.type} on ${o.fulfillment.date}`);
  if (o.fulfillment.address) lines.push(`Address: ${o.fulfillment.address}`);
  lines.push(`Customer: ${o.customer.phone}${o.customer.email ? ` · ${o.customer.email}` : ''}`);
  if (o.notes) lines.push(`Notes: ${o.notes}`);
  lines.push('');
  lines.push(`Order ID: ${o.website_order_id}`);
  return lines.join('\n');
}

async function sendViaResend(o: OrderPayload, to: string): Promise<ChannelResult> {
  const apiKey = process.env.RESEND_API_KEY!;
  const from = process.env.RESEND_FROM || 'Neighborly Loaf <onboarding@resend.dev>';
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: o.customer.email || undefined,
        subject: `New order — ${o.customer.name} (${money(o.total)})`,
        text: orderSummary(o),
      }),
    });
    if (!res.ok) {
      return { status: 'failed', detail: `Resend ${res.status}: ${(await res.text()).slice(0, 300)}` };
    }
    return { status: 'sent' };
  } catch (err) {
    return { status: 'failed', detail: `Resend fetch failed: ${(err as Error).message}` };
  }
}

async function sendViaFormSubmit(o: OrderPayload, to: string): Promise<ChannelResult> {
  // FormSubmit rejects requests that lack a web-server Referer (anti-spam), so
  // we present the site's origin. APP_URL is set in production; the default
  // just needs to be a plausible https origin for FormSubmit's check.
  const origin = process.env.APP_URL || 'https://yourneighborlyloaf.com';
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Referer: origin,
        Origin: origin,
      },
      body: JSON.stringify({
        _subject: `New order — ${o.customer.name} (${money(o.total)})`,
        _replyto: o.customer.email || undefined,
        _template: 'box',
        name: o.customer.name,
        order: orderSummary(o),
      }),
    });

    // FormSubmit always returns HTTP 200; the real outcome is in the JSON body.
    //   success:"true"  -> delivered
    //   success:"false" + "Activation" message -> queued, owner must click the
    //     one-time activation link before delivery begins (not a failure)
    //   success:"false" + anything else -> a real rejection
    const text = await res.text();
    let body: { success?: string; message?: string } = {};
    try { body = JSON.parse(text); } catch { /* non-JSON => treat as failure below */ }

    if (body.success === 'true') return { status: 'sent' };
    if (/activat/i.test(body.message || '')) {
      return { status: 'sent', detail: 'pending one-time owner activation (check inbox)' };
    }
    return { status: 'failed', detail: `FormSubmit: ${(body.message || text).slice(0, 300)}` };
  } catch (err) {
    return { status: 'failed', detail: `FormSubmit fetch failed: ${(err as Error).message}` };
  }
}

export async function notifyOwner(o: OrderPayload): Promise<ChannelResult> {
  const to = process.env.OWNER_EMAIL;
  if (!to) return { status: 'skipped', detail: 'OWNER_EMAIL not set' };
  // Prefer Resend when configured; otherwise use FormSubmit (no API key).
  return process.env.RESEND_API_KEY ? sendViaResend(o, to) : sendViaFormSubmit(o, to);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  if (!isValidPayload(req.body)) {
    return res.status(400).json({ error: 'invalid_payload' });
  }

  const email = await notifyOwner(req.body);
  const status = email.status === 'sent' ? 200 : email.status === 'failed' ? 502 : 503;
  return res.status(status).json({ ok: email.status === 'sent', email });
}
