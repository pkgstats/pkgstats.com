// const npmUser = require('npm-user');

// const registryOrigin = 'https://registry.npmjs.org';
// const apiOrigin = 'https://api.npmjs.org';

// let _origin = 'https://pkgstats.com/npm';
let _origin = 'http://192.168.1.32:3000/npm';

class NPMService {
  static get origin() {
    return _origin;
  }

  static set origin(value) {
    _origin = value;
  }

  static get headers() {
    return {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
    };
  }

  static makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const request = new Request(`${this.origin}${url}`, {
        headers: this.headers,
      });

      let errorResponse = false;

      fetch(request)
        .then(response => {
          if (!response.ok) {
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
    // return Promise.reject(null);

    // return npmUser(username);

    return this.makeRequest(`/users/${username}`);
  }

  static getUserPackages(username) {
    return this.search(`author:${username}`);
  }

  static search(text) {
    // return this.makeRequest(`${registryOrigin}/-/v1/search?text=${text}&size=${size}&from=${from}&quality=${quality}&popularity=${popularity}&maintenance=${maintenance}`);
    return this.makeRequest(`/search?text=${text}`);
  }

  static getDownloads(packages, timeframe = 'last-month') {
    // return this.makeRequest(`${apiOrigin}/downloads/point/${timeframe}/${packages}`);
    return this.makeRequest(`/downloads/${timeframe}/${packages}`);
  }
}

module.exports = NPMService;
