import express from 'express';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// Load .env.local first (developer secrets), then fall back to .env.
// In production, hosting-provider env vars take precedence and these calls are no-ops.
dotenv.config({ path: '.env.local' });
dotenv.config();

const WEBHOOK_URL = 'https://xcbethsneocssvwbxyjb.supabase.co/functions/v1/webhooks-orders';
const SECRET = process.env.BAKERY_WEBHOOK_SECRET;
const PORT = Number(process.env.PORT) || 8787;

if (!SECRET) {
  console.warn('[orders] BAKERY_WEBHOOK_SECRET is not set — /api/orders will return 503');
}

type IncomingItem = { sku: string; name: string; qty: number; unit_price: number };
type IncomingPayload = {
  website_order_id: string;
  placed_at: string;
  customer: { name: string; email: string; phone: string };
  fulfillment: { type: 'pickup' | 'delivery'; date: string; address: string | null };
  items: IncomingItem[];
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

const app = express();
app.use(express.json({ limit: '64kb' }));

app.post('/api/orders', async (req, res) => {
  if (!SECRET) {
    return res.status(503).json({ error: 'webhook_secret_missing' });
  }
  if (!isValidPayload(req.body)) {
    return res.status(400).json({ error: 'invalid_payload' });
  }

  const body = JSON.stringify(req.body);
  const signature = crypto.createHmac('sha256', SECRET).update(body).digest('hex');

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
    res.status(upstream.status).type(upstream.headers.get('content-type') || 'application/json').send(text);
  } catch (err) {
    console.error('[orders] upstream fetch failed', err);
    res.status(502).json({ error: 'upstream_unreachable' });
  }
});

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
app.use(express.static(distDir));
app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));

app.listen(PORT, () => {
  console.log(`[orders] listening on :${PORT}`);
});
