// const npmUser = require('npm-user');

// const registryOrigin = 'https://registry.npmjs.org';
// const apiOrigin = 'https://api.npmjs.org';

// let _origin = 'https://pkgstats.com/npm';
let _origin = 'http://192.168.1.198:3000/npm';

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
    return this.search(`maintainer:${username}`);
  }

  static search(text = '', {size = 50, skip = 0, quality = null, popularity = null, maintenance = null} = {}) {
    let params = `?size=${size}&from=${skip}`;

    if (text !== '') {
      params += `&text=${text}`;
    }

    if (quality !== null) {
      params += `&quality=${quality}`;
    }

    if (popularity !== null) {
      params += `&popularity=${popularity}`;
    }

    if (maintenance !== null) {
      params += `&maintenance=${maintenance}`;
    }

    return this.makeRequest(`/search?${params}`);
  }

  static getDownloads(packages, type = 'range', timeframe = 'last-month') {
    return this.makeRequest(`/downloads/${type}/${timeframe}/${packages}`);
  }
}

module.exports = NPMService;
