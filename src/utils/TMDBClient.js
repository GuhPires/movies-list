import Request from './Request';

export default class TMDBClient {
  #url = process.env.REACT_APP_TMDB_URL;
  #token = process.env.REACT_APP_TMDB_TOKEN;
  #request = new Request(this.#url, {
    headers: {
      'Authorization': `Bearer ${this.#token}`
    }
  });

  async movie(id) {
    try {
      if (!id) throw new Error('Missing movie ID');

      const movie = await this.#request.get(`movie/${id}`);

      return movie;

    } catch (err) {
      // TODO: create error objects
      return err.message;
    }
  }

  async tv(id) {
    try {
      if (!id) throw new Error('Missing TV show ID');

      const show = await this.#request.get(`tv/${id}`);

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