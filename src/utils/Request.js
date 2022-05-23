export default class Request {
  #baseURL = '';
  #options = { method: 'GET' };

  constructor(baseURL, options = null) {
    if (!baseURL) throw new Error('No base URL was provided');

    // TODO: make it an URL object
    this.#baseURL = baseURL;
    this.#options = { ...this.#options, ...options };
  }

  async #request(endpoint = '', method = 'GET', body = null) {
    let options = { ...this.#options, method };

    // TODO: use switch block so we can handle not allowed methods
    if (method === 'POST' || method === 'PUT') {
      if (!body) throw new Error('Missing request body');

      options.body = JSON.stringify(body);
    }

    const data = await fetch(`${this.#baseURL}/${endpoint}`, options);

    return JSON.parse(data);
  }

  async get(endpoint = '') {
    return this.#request(endpoint, 'GET');
  }

  // ?: named params?
  async put(endpoint = '', body = null) {
    return this.#request(endpoint, 'PUT', body);
  }

  // ?: named params?
  async post(endpoint = '', body = null) {
    return this.#request(endpoint, 'POST', body);
  }

  async delete(endpoint = '') {
    return this.#request(endpoint, 'DELETE');
  }
}
