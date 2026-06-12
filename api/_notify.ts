// Shared owner-notification logic used by both the Vercel function (api/orders.ts)
// and the local Express dev server (server/index.ts).
//
// When an order is placed we email the full order to the bakery owner.
// Delivery uses FormSubmit (zero-config, no API key) by default, and upgrades
// automatically to Resend when RESEND_API_KEY is set.
//
// Env vars:
//   OWNER_EMAIL    — destination inbox (required)
//   APP_URL        — site origin, used as the FormSubmit Referer (optional)
//   RESEND_API_KEY — switches delivery to Resend when present (optional)
//   RESEND_FROM    — Resend from-address (optional)

export type OrderItem = { sku: string; name: string; qty: number; unit_price: number };
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

export type ChannelResult = { status: 'sent' | 'skipped' | 'failed'; detail?: string };

const money = (n: number) => `$${n.toFixed(2)}`;

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

async function sendEmail(o: OrderPayload): Promise<ChannelResult> {
  const to = process.env.OWNER_EMAIL;
  if (!to) return { status: 'skipped', detail: 'OWNER_EMAIL not set' };

  // Prefer Resend when an API key is present (branded, most reliable).
  // Otherwise fall back to FormSubmit, a zero-account form-to-email forwarder —
  // no API key needed; the owner just confirms a one-time activation link in
  // the first email before delivery begins.
  return process.env.RESEND_API_KEY ? sendViaResend(o, to) : sendViaFormSubmit(o, to);
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
  // FormSubmit rejects requests that lack a web-server Referer (anti-spam),
  // so we present the site's origin. APP_URL is set in production; the default
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
  return sendEmail(o);
}
