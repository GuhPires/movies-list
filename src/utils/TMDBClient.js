
export default class TMDBClient {
  #url = process.env.REACT_APP_TMDB_URL;
  #token = process.env.REACT_APP_TMDB_TOKEN;

  async #request(endpoint) {
    const data = await fetch(`${this.#url}/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.#token}`
      }
    });

    return JSON.parse(data);
  }

  async movie(id) {
    try {
      if (!id) throw new Error('Missing movie ID');

      const movie = await this.#request(`movie/${id}`);

      return movie;

    } catch (err) {
      // TODO: create error objects
      return err.message;
    }
  }

  async tv(id) {
    try {
      if (!id) throw new Error('Missing show ID');

      const show = await this.#request(`tv/${id}`);

      return show;

    } catch (err) {
      // TODO: create error objects
      return err.message;
    }
  }

  async search(query) {
    try {
      if (!query) throw new Error('Missing query');
      if (query.length < 3) throw new Error('Query is too short');

    } catch (err) {
      // TODO: create error objects
      return err.message;
    }
  }
}