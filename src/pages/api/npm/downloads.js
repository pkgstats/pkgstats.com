require('es6-promise').polyfill();
require('isomorphic-fetch');

/**
 * Origin for api.x requests.
 *
 * @const {string}
 */
const apiOrigin = 'https://api.npmjs.org';

export default async (req, res) => {
  try {
    const {
      query: { packages, timeframe, type },
    } = req;

    const url = `${apiOrigin}/downloads/${type}/${timeframe}/${packages}`;
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
}
