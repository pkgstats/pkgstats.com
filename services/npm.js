require('es6-promise').polyfill();
require('isomorphic-fetch');

const express = require('express');
const npmUser = require('npm-user');
const router = express.Router();

/**
 * Origin for api.x requests.
 *
 * @const {string}
 */
const apiOrigin = 'https://api.npmjs.org';

/**
 * Origin for registry.x requests.
 *
 * @const {string}
 */
const registryOrigin = 'https://registry.npmjs.org';


router.get('/users/:username', async (req, res) => {
  const user = await npmUser(req.params.username);

  res.json(user);
});

router.get('/downloads/:type/:timeframe/:packages*', async (req, res) => {
  try {
    const {
      packages,
      timeframe,
      type,
    } = req.params;

    const url = `${apiOrigin}/downloads/${type}/${timeframe}/${packages}${req.params[0] ? `/${req.params[0]}` : ''}`;
    const response = await fetch(url);
    const json = await response.json();

    res.json(json);
  }
  catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Error fetching download stats',
    });
  }
});

router.get('/pkg/:pkg/:version?', async (req, res) => {
  try {
    const {
      pkg,
      version,
    } = req.params;

    const url = version
      ? `${registryOrigin}/${pkg}/${version}`
      : `${registryOrigin}/${pkg}`;

    const response = await fetch(url);
    const json = await response.json();

    res.json(json);
  }
  catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Error fetching package info',
    });
  }
});

router.get('/org/:organization', async (req, res) => {

});

router.get('/search', async (req, res) => {
  try {
    const {
      query,
    } = req;

    const esc = encodeURIComponent;
    const queryParams = Object.keys(query)
      .map(key => `${esc(key)}=${esc(query[key])}`)
      .join('&');

    const url = `${registryOrigin}/-/v1/search?${queryParams}`;
    const response = await fetch(url);
    const json = await response.json();

    res.json(json);
  }
  catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Error performing search',
    });
  }
});

module.exports = router;
