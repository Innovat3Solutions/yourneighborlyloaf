import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import handler from '../api/orders';

// Load .env.local first (developer secrets), then fall back to .env.
// In production, hosting-provider env vars take precedence and these calls are no-ops.
dotenv.config({ path: '.env.local' });
dotenv.config();

const PORT = Number(process.env.PORT) || 8787;

const app = express();
app.use(express.json({ limit: '64kb' }));

// Reuse the exact Vercel handler so dev and prod share one implementation.
// Express req/res are compatible with the methods the handler uses
// (method, body, status, json, setHeader).
app.post('/api/orders', (req, res) => handler(req, res));

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
app.use(express.static(distDir));
app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));

app.listen(PORT, () => {
  console.log(`[orders] listening on :${PORT}`);
});
