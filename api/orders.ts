import crypto from 'node:crypto';

const WEBHOOK_URL = 'https://xcbethsneocssvwbxyjb.supabase.co/functions/v1/webhooks-orders';

type IncomingPayload = {
  website_order_id: string;
  placed_at: string;
  customer: { name: string; email: string; phone: string };
  fulfillment: { type: 'pickup' | 'delivery'; date: string; address: string | null };
  items: { sku: string; name: string; qty: number; unit_price: number }[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  notes: string;
};

function isValidPayload(p: unknown): p is IncomingPayload {
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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const secret = process.env.BAKERY_WEBHOOK_SECRET;
  if (!secret) {
    return res.status(503).json({ error: 'webhook_secret_missing' });
  }

  if (!isValidPayload(req.body)) {
    return res.status(400).json({ error: 'invalid_payload' });
  }

  const body = JSON.stringify(req.body);
  const signature = crypto.createHmac('sha256', secret).update(body).digest('hex');

  try {
    const upstream = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Bakery-Signature': signature,
      },
      body,
    });
    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('content-type', upstream.headers.get('content-type') || 'application/json');
    return res.send(text);
  } catch (err) {
    console.error('[orders] upstream fetch failed', err);
    return res.status(502).json({ error: 'upstream_unreachable' });
  }
}
