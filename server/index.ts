import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { notifyOwner, type OrderPayload } from '../api/_notify';

// Load .env.local first (developer secrets), then fall back to .env.
// In production, hosting-provider env vars take precedence and these calls are no-ops.
dotenv.config({ path: '.env.local' });
dotenv.config();

const PORT = Number(process.env.PORT) || 8787;

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

const app = express();
app.use(express.json({ limit: '64kb' }));

app.post('/api/orders', async (req, res) => {
  if (!isValidPayload(req.body)) {
    return res.status(400).json({ error: 'invalid_payload' });
  }

  const email = await notifyOwner(req.body);
  const status = email.status === 'sent' ? 200 : email.status === 'failed' ? 502 : 503;
  console.log('[orders] notify', req.body.website_order_id, JSON.stringify(email));
  return res.status(status).json({ ok: email.status === 'sent', email });
});

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
app.use(express.static(distDir));
app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));

app.listen(PORT, () => {
  console.log(`[orders] listening on :${PORT}`);
});
