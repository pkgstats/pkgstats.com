/**
 * ApiService
 *
 * @author Ryan Hefner <hi@ryanhefner.com> (https://www.ryanhefner.com)
 */

/**
 * Object that contains configuration values for this class.
 *
 * Example: {baseURL, authToken, csrfToken}
 */
let _store;

class ApiService {

// Getters & Setters _________________________________________________________

  static set store(value) {
    _store = value;
  }

  static get store() {
    return _store.getState();
  }

  static get state() {
    return this.store.getState();
  }

  static get baseURL() {
    return this.store && this.store.app.apiUrl
      ? this.store.app.apiUrl
      : null;
  }

  static get headers() {
    let headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
    };

    if (!this.store) {
      return headers;
    }

    if (this.store.auth.csrfToken) {
      headers = Object.assign(headers, {
        'X-CSRF-TOKEN': this.store.auth.csrfToken,
      });
    }

    if (this.store.auth.authToken) {
      headers = Object.assign(headers, {
        'Authorization': `Bearer ${this.store.auth.authToken}`,
      });
    }

    return headers;
  }

  static get requestOptions() {
    return {
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
    };
  }

// Public Methods ____________________________________________________________

  static get({uri, options = {}}, dispatch = () => {}) {
    return this.makeRequest(uri, options, 'GET', dispatch);
  }

  static head({uri, options = {}}, dispatch = () => {}) {
    return this.makeRequest(uri, options, 'HEAD', dispatch);
  }

  static patch({uri, options = {}}, dispatch = () => {}) {
    return this.makeRequest(uri, options, 'PATCH', dispatch);
  }

  static put({uri, options = {}}, dispatch = () => {}) {
    return this.makeRequest(uri, options, 'PUT', dispatch);
  }

  static post({uri, options = {}}, dispatch = () => {}) {
    return this.makeRequest(uri, options, 'POST', dispatch);
  }

  static delete({uri, options = {}}, dispatch = () => {}) {
    return this.makeRequest(uri, options, 'DELETE', dispatch);
  }

  static makeRequest(uri, options = {}, method = 'GET', dispatch = () => {}) {
    return new Promise((resolve, reject) => {
      options = Object.assign(
        {},
        this.requestOptions,
        this.buildRequestData(options, method),
        {
          headers: Object.assign(
            {},
            this.headers,
            method === 'PATCH' || method === 'PUT' || method === 'DELETE'
              ? {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
              : {},
            options.headers || {},
          ),
          method,
        }
      );
      const url = this.generateRequestUrl(uri, options, method);
      const request = new Request(url, options);
      let errorResponse = false;

      fetch(request)
        .then(response => {
          if (!response.ok) {
            errorResponse = true;
          }

          return response.json();

          // throw new Error(
          //   `Error making ${method} request to ${uri}`,
          //   'ApiService.js',
          //   108
          // );
        })
        .then(json => {
          return errorResponse ? reject(json) : resolve(json);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }

  static buildRequestData(options, method) {
    switch (method) {
      case 'PATCH':
      case 'PUT':
      case 'DELETE':
        if (!options.hasOwnProperty('data')) {
          return options;
        }

        const {
          data,
        } = options;

        const formBody = [];

        Object.keys(data).forEach(key => {
          formBody.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
        });

        return Object.assign({}, options, {
          body: formBody.join('&'),
        });

      case 'POST':
        if (!options.hasOwnProperty('data')) {
          return options;
        }

        if (typeof options.data === 'string') {
          return Object.assign({}, options, {
            body: options.data,
          });
        }

        if (options.data instanceof FormData) {
          return Object.assign({}, options, {
            body: options.data,
          });
        }

        const formData = new FormData;

        Object.keys(options.data).forEach((key) => {
          formData.append(key, options.data[key]);
        });

        return Object.assign({}, options, {
          body: formData,
        });

      case 'GET':
      case 'HEAD':
      default:
        return options;
    }
  }

  static generateRequestUrl(uri, options, method) {
    const baseURL = this.baseURL;
    let url = baseURL && (!uri || !uri.length || uri.indexOf(baseURL) === -1)
      ? `${baseURL}${uri || ''}`
      : uri;

    switch (method) {
      case 'PATCH':
      case 'POST':
      case 'PUT':
      case 'DELETE':
        return url;

      case 'GET':
      case 'HEAD':
      default:
        const data = Object.assign({}, options.data || {});
        Object.keys(data).forEach((key) => {
          if (data[key] !== null) {
            url += url.indexOf('?') === -1
              ? `?${key}=${data[key]}`
              : `&${key}=${data[key]}`;
          }
        });

        return url;
    }
  }
}

export default ApiService;
