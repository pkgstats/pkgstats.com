const path = require('path');
const express = require('express');
const nextJS = require('next');
const routes = require('./routes');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const NPMService = require('./src/store/services/NPMService');
const npm = require('./services/npm');

const secureRedirect = require('./middleware/secureRedirect');

const app = nextJS({ dev, dir: './src' });
const handler = routes.getRequestHandler(app);

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '8464c744b2074f008c9e2f155d44792a',
  captureUncaught: true,
  captureUnhandledRejections: true
});

app.prepare().then(() => {
  const server = express();

  // Secure redirect
  if (!dev) {
    server.use(secureRedirect);
  }

  // Favicon
  server.use('/favicon.ico', express.static(path.join(__dirname, 'src', 'static', 'images', 'favicon.ico')));

  // Static assets
  server.use('/static', express.static(path.join(__dirname, 'src', 'static')));

  // NPM routes
  server.use('/npm', npm);

  // Routes
  server.use(handler);

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
  });
});
