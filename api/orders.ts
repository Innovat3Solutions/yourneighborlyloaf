import { notifyOwner, type OrderPayload } from './_notify.ts';

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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  if (!isValidPayload(req.body)) {
    return res.status(400).json({ error: 'invalid_payload' });
  }

  const result = await notifyOwner(req.body);
  const sent = result.email.status === 'sent' || result.sms.status === 'sent';
  const allFailed = result.email.status === 'failed' && result.sms.status === 'failed';

  // 200 if at least one channel delivered; 502 only when every configured
  // channel actively failed (so the frontend can fall back to the SMS link).
  return res.status(sent ? 200 : allFailed ? 502 : 503).json({ ok: sent, channels: result });
}
