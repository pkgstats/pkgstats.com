require('dotenv').config();

const path = require('path');
const express = require('express');
const nextJS = require('next');
const compression = require('compression');
const routes = require('./routes');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const npm = require('./services/npm');
const snyk = require('./services/snyk');

const secureRedirect = require('./middleware/secureRedirect');

const app = nextJS({ dev, dir: './src' });
const handler = routes.getRequestHandler(app);

// include and initialize the rollbar library with your access token
const Rollbar = require("rollbar");
const rollbar = new Rollbar(process.env.ROLLBAR_ACCESS_TOKEN);

app.prepare().then(() => {
  const server = express();

  // Secure redirect
  if (!dev) {
    server.use(secureRedirect);
  }

  // Compress responses
  server.use(compression());

  // Favicon
  server.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'static', 'images', 'favicon.ico')));

  // Static assets
  server.use('/static', express.static(path.join(__dirname, 'public', 'static'), {
    immutable: true,
    maxAge: 2592000
  }));

  // NPM routes
  server.use('/npm', npm);

  // Snyk routes
  server.use('/snyk', snyk);

  // Routes
  server.use(handler);

  // Rollbar error handling
  server.use(rollbar.errorHandler());

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
  });
});
