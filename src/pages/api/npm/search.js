require('es6-promise').polyfill();
require('isomorphic-fetch');

/**
 * Origin for registry.x requests.
 *
 * @const {string}
 */
const registryOrigin = 'https://registry.npmjs.org';

export default async (req, res) => {
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
}
