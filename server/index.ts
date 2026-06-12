import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Local preview server: serves the built site from dist/. Order emails are
// sent directly from the browser to Web3Forms, so no API route is needed here.
const PORT = Number(process.env.PORT) || 8787;

const app = express();

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
app.use(express.static(distDir));
app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));

app.listen(PORT, () => {
  console.log(`[preview] listening on :${PORT}`);
});
