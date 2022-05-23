import Request from '../../utils/Request';

const URL = 'http://someurl.com';
const ENDPOINT = 'something';
const BODY = { data: true };
const FETCH_OPTIONS = { headers: { some: 'value' } };

describe('• Request', () => {
  describe('# constructor', () => {
    it('should throw an error when no base URL was passed', async () => {
      expect.assertions(1);

      let errMsg = 'Method did not threw rejection';

      try {
        new Request();
      } catch (err) {
        errMsg = err.message;
      }

      expect(errMsg).toEqual('No base URL was provided');
    });

    it.todo('should throw an error when an invalid base URL was passed');
  });

  describe.each(['get', 'delete'])('# %s', (method) => {
    it.todo(`should handle a ${method.toUpperCase()} request error`);

    it(`should perform a ${method.toUpperCase()} request`, async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL);
      const result = await request[method]();

      expect(fetch).toHaveBeenCalledWith(`${URL}/`, {
        method: method.toUpperCase(),
      });
      expect(result).toStrictEqual(expected);
    });

    it(`should perform a ${method.toUpperCase()} request on an endpoint`, async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL);
      const result = await request[method](ENDPOINT);

      expect(fetch).toHaveBeenCalledWith(`${URL}/${ENDPOINT}`, {
        method: method.toUpperCase(),
      });
      expect(result).toStrictEqual(expected);
    });

    it(`should perform a method.toUpperCase() request with headers`, async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL, FETCH_OPTIONS);
      const result = await request[method]();

      expect(fetch).toHaveBeenCalledWith(`${URL}/`, {
        ...FETCH_OPTIONS,
        method: method.toUpperCase(),
      });
      expect(result).toStrictEqual(expected);
    });
  });

  describe.each(['put', 'post'])('# %s', (method) => {
    it('should throw when no body was provided', async () => {
      expect.assertions(1);

      let errMsg = 'Method did not threw rejection';

      try {
        const request = new Request(URL);
        await request[method]();
      } catch (err) {
        errMsg = err.message;
      }

      expect(errMsg).toEqual('Missing request body');
    });

    it.todo(`should handle a ${method.toUpperCase()} request error`);

    it(`should perform a ${method.toUpperCase()} request`, async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL);
      const result = await request[method]('', BODY);

      expect(fetch).toHaveBeenCalledWith(`${URL}/`, {
        method: method.toUpperCase(),
        body: JSON.stringify(BODY),
      });
      expect(result).toStrictEqual(expected);
    });

    it(`should perform a ${method.toUpperCase()} request on an endpoint`, async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL);
      const result = await request[method](ENDPOINT, BODY);

      expect(fetch).toHaveBeenCalledWith(`${URL}/${ENDPOINT}`, {
        method: method.toUpperCase(),
        body: JSON.stringify(BODY),
      });
      expect(result).toStrictEqual(expected);
    });

    it(`should perform a ${method.toUpperCase()} request with headers`, async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL, FETCH_OPTIONS);
      const result = await request[method]('', BODY);

      expect(fetch).toHaveBeenCalledWith(`${URL}/`, {
        ...FETCH_OPTIONS,
        method: method.toUpperCase(),
        body: JSON.stringify(BODY),
      });
      expect(result).toStrictEqual(expected);
    });
  });
});
