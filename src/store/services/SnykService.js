let _origin = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3000/snyk'
  : 'https://www.pkgstats.com/snyk';

class SnykService {
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

  static getVulnerabilities(packageName, version) {
    return this.makeRequest(`/test/npm/lib/${packageName}/${version}`)
  }
}

module.exports = SnykService;
