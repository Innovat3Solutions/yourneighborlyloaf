// Vercel serverless function: receives an order from the website and emails
// the full order to the bakery owner via Resend. Self-contained (no local
// imports) so the Vercel Node runtime has nothing to fail to resolve.
//
// Env vars (set in Vercel project settings and .env.local):
//   RESEND_API_KEY — Resend API key (required to send)
//   OWNER_EMAIL    — destination inbox (required)
//   RESEND_FROM    — from-address (optional; defaults to onboarding@resend.dev,
//                    which can only send to your own Resend account email until
//                    you verify a domain)

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

type SendResult = { status: 'sent' | 'skipped' | 'failed'; detail?: string };

async function sendViaResend(o: OrderPayload): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_EMAIL;
  if (!apiKey || !to) {
    return { status: 'skipped', detail: 'RESEND_API_KEY or OWNER_EMAIL not set' };
  }
  const from = process.env.RESEND_FROM || 'Your Neighborly Loaf <onboarding@resend.dev>';
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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  if (!isValidPayload(req.body)) {
    return res.status(400).json({ error: 'invalid_payload' });
  }

  const result = await sendViaResend(req.body);
  const status = result.status === 'sent' ? 200 : result.status === 'failed' ? 502 : 503;
  return res.status(status).json({ ok: result.status === 'sent', email: result });
}
