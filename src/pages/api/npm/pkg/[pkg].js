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
      query: { pkg, version },
    } = req;

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
}
