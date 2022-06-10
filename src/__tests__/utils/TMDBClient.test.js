import TMDBClient from '../../utils/TMDBClient';
import Request from '../../utils/Request';
import { MOCKED_MOVIES, MOCKED_SHOWS } from '../mocks/TMDB';

jest.mock('../../utils/Request');

describe('• TMDB Client', () => {
  let client;

  beforeEach(() => {
    Request.mockClear();
    client = new TMDBClient();
  });

  describe('# constructor', () => {
    it('should create a Request instance', async () => {
      expect(Request).toHaveBeenCalled();
    });
  });

  describe.each(['movie', 'tv'])('# %s', (method) => {
    const isMovie = method === 'movie';
    const methodStr = isMovie ? method : 'TV show';

    it('should return an error when no ID is provided', async () => {
      expect.assertions(1);

      let errMsg = 'Method did not threw rejection';

      try {
        await client[method]();
      } catch (err) {
        errMsg = err.message;
      }

      expect(errMsg).toBe(`Missing ${methodStr} ID`);
    });

    it(`should get a ${methodStr} with the specified ID`, async () => {
      const expected = isMovie ? MOCKED_MOVIES[0] : MOCKED_SHOWS[0];
      const id = isMovie ? 550 : 2316;

      const requestGetMock = jest
        .spyOn(Request.prototype, 'get')
        .mockImplementation(() => expected);

      const result = await client[method](id);

      expect(requestGetMock).toHaveBeenCalledWith(`${method}/${id}`);
      expect(result).toStrictEqual(expected);
    });

    it.todo(`should handle when the ${methodStr} is not found`);
  });

  describe('# search', () => {
    it('should return an error when no query is provided', async () => {
      expect.assertions(1);

      let errMsg = 'Method did not threw rejection';

      try {
        await client.search();
      } catch (err) {
        errMsg = err.message;
      }

      expect(errMsg).toBe('Missing query');
    });

    it('should return an error when the query is too short', async () => {
      expect.assertions(1);

      let errMsg = 'Method did not threw rejection';

      try {
        await client.search('ab');
      } catch (err) {
        errMsg = err.message;
      }

      expect(errMsg).toBe('Query is too short');
    });

    it.todo('should return a list with the query results');

    it.todo('should handle when no movie or TV show is found');
  });
});
