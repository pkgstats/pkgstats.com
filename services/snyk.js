require('es6-promise').polyfill();
require('isomorphic-fetch');

const LRU = require('lru-cache');
const express = require('express');
const router = express.Router();

const Rollbar = require("rollbar");
const rollbar = new Rollbar(process.env.ROLLBAR_ACCESS_TOKEN);

/**
 * Cache requests for 3 hours
 *
 * @var NodeCache
 */
const cache = new LRU({
  max: 1000,
  maxAge: 7 * 60 * 60 * 1000,
});

/**
 * Origin for api.x requests.
 *
 * @const {string}
 */
// const apiOrigin = 'https://snyk.io/api/v1';
const apiOrigin = 'http://snyk-widget.herokuapp.com';

router.get('/*', async (req, res) => {
  const cachedResponse = cache.get(req.url);

  if (cachedResponse) {
    res.json(cachedResponse);
    return;
  }

  try {
    const url = `${apiOrigin}/${req.params[0]}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `${process.env.SNYK_WIDGET_TOKEN}`,
      },
    });
    const json = await response.json();
    cache.set(req.url, json);

    res.json(json);
  }
  catch (e) {
    console.error(e);
    rollbar.error(e);
    res.status(500).json({
      error: 'Error fetching Snyk resource'
    });
  }
});

module.exports = router;
