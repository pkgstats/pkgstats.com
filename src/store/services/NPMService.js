let _origin = process.env.NODE_ENV !== 'production'
  ? 'http://172.16.42.134:3000/npm'
  : 'https://www.pkgstats.com/npm';

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
      return this.makeRequest(`/pkg/${pkg}/${version}`);
    }

    return this.makeRequest(`/pkg/${pkg}`);
  }

  static getUser(username) {
    return this.makeRequest(`/users/${username}`);
  }

  static getUserPackages(username) {
    return this.search(`maintainer:${username}`);
  }

  static search(text = '', options = {}) {
    const requestOptions = Object.assign({}, {
      size: 50,
      skip: 0,
      quality: null,
      popularity: null,
      maintenance: null,
    }, options);

    const {
      size,
      skip,
      quality,
      popularity,
      maintenance,
    } = requestOptions;

    let params = `size=${size}&from=${skip}`;

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
