// const npmUser = require('npm-user');

const registryOrigin = 'https://registry.npmjs.org';
const apiOrigin = 'https://api.npmjs.org';

class NPMService {
  static get headers() {
    return {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/vnd.npm.install-v1+json',
    };
  }

  static makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const request = new Request(url, {
        headers: this.headers,
      });

      let errorResponse = false;

      fetch(request)
        .then(response => {
          if (response.ok) {
            errorResponse = true;
          }

          return response.json();
        })
        .then(json => {
          return errorResponse ? reject(json) : resolve(json);
        })
        .catch(error => {
          return reject(error);
        });
    });
  }

  static getPackage(pkg, version = null) {
    if (version) {
      return this.makeRequest(`${registryOrigin}/${pkg}/${version}`);
    }

    return this.makeRequest(`${registryOrigin}/${pkg}`);
  }

  static getUser(username) {
    return Promise.reject(null);

    // return npmUser(username);
  }

  static getUserPackages(username) {
    return this.search(`author:${username}`);
  }

  static search(text, size = 50, from = 0, quality = 0, popularity = 0, maintenance = 0) {
    return this.makeRequest(`${registryOrigin}/-/v1/search?text=${text}&size=${size}&from=${from}&quality=${quality}&popularity=${popularity}&maintenance=${maintenance}`);
  }

  static getDownloads(packages, timeframe = 'last-month') {
    return this.makeRequest(`${apiOrigin}/downloads/point/${timeframe}/${packages}`);
  }
}

export default NPMService;
