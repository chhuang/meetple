const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 8000;

app.prepare().then(() => {
  const server = express();

  server.use(handler);

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
