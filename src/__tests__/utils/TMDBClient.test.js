import TMDBClient from "../../utils/TMDBClient";

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
      const expected = true;

      fetch.mockResolvedValue(expected);

      const result = await client.movie('123');

      expect(fetch).toHaveBeenCalled();
      expect(result).toBe(expected);

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
      const expected = true;

      fetch.mockResolvedValue(expected);

      const result = await client.tv('123');

      expect(fetch).toHaveBeenCalled();
      expect(result).toBe(expected);

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