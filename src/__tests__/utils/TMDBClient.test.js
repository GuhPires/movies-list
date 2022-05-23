import TMDBClient from "../../utils/TMDBClient";
import { MOCKED_MOVIES, MOCKED_SHOWS } from "../mocks/TMDB";

const { REACT_APP_TMDB_URL: URL, REACT_APP_TMDB_TOKEN: TOKEN } = process.env;

const FETCH_OPTIONS = { headers: { 'Authorization': `Bearer ${TOKEN}` } };

describe('• TMDB Client', () => {
  let client;
  
  beforeAll(() => {
    client = new TMDBClient();
  });

  describe('# movie', () => {
    it('should return an error when no ID is provided', async () => {
      const expected = 'Missing movie ID';

      const result = await client.movie();

      expect(result).toBe(expected);
    });

    it('should get a movie with the specified ID', async () => {
      const expected = MOCKED_MOVIES[0];
      const id = 550;

      fetch.mockResolvedValue(JSON.stringify(expected));

      const result = await client.movie(id);

      expect(fetch).toHaveBeenCalledWith(`${URL}/movie/${id}`, FETCH_OPTIONS);
      expect(result).toStrictEqual(expected);

    });

    it.todo('should handle when the movie is not found');
  });

  describe('# tv', () => {
    it('should return an error when no ID is provided', async () => {
      const expected = 'Missing show ID';

      const result = await client.tv();

      expect(result).toBe(expected);
    });

    it('should get a TV show with the specified ID', async () => {
      const expected = MOCKED_SHOWS[0];
      const id = 2316;

      fetch.mockResolvedValue(JSON.stringify(expected));

      const result = await client.tv(id);

      expect(fetch).toHaveBeenCalledWith(`${URL}/tv/${id}`, FETCH_OPTIONS);
      expect(result).toStrictEqual(expected);

    });

    it.todo('should handle when the TV show is not found');
  });

  describe('# search', () => {
    it('should return an error when no query is provided', async () => {
      const expected = 'Missing query';

      const result = await client.search();

      expect(result).toBe(expected);
    });

    it('should return an error when the query is too short', async () => {
      const expected = 'Query is too short';

      const result = await client.search('ab');

      expect(result).toBe(expected);
    });

    it.todo('should return an list with the query results');
    
    it.todo('should handle when no movie or TV show is found');
  });

});