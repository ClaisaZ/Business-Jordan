// Express backend for Business-Jordan (COMP 1350 Milestone A)
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Read port from env so Milestone C can run multiple copies (3000, 3001...)
const PORT = process.env.PORT || 3000;
// Only listen locally - Nginx is the only public-facing service
const HOST = '127.0.0.1';

// Simple backend route to prove the server is alive
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', port: PORT });
});

// Serve the built React app
app.use(express.static(path.join(__dirname, 'dist')));

// Send index.html for any other route (React handles the page)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
