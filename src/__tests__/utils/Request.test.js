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

  describe('# get', () => {
    it.todo('should handle a GET request error');

    it('should perform a GET request', async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL);
      const result = await request.get();

      expect(fetch).toHaveBeenCalledWith(`${URL}/`, { method: 'GET' });
      expect(result).toStrictEqual(expected);
    });

    it('should perform a GET request on an endpoint', async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL);
      const result = await request.get(ENDPOINT);

      expect(fetch).toHaveBeenCalledWith(`${URL}/${ENDPOINT}`, {
        method: 'GET',
      });
      expect(result).toStrictEqual(expected);
    });

    it('should perform a GET request with headers', async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL, FETCH_OPTIONS);
      const result = await request.get();

      expect(fetch).toHaveBeenCalledWith(`${URL}/`, {
        ...FETCH_OPTIONS,
        method: 'GET',
      });
      expect(result).toStrictEqual(expected);
    });
  });

  describe('# put', () => {
    it('should throw when no body was provided', async () => {
      expect.assertions(1);

      let errMsg = 'Method did not threw rejection';

      try {
        const request = new Request(URL);
        await request.put();
      } catch (err) {
        errMsg = err.message;
      }

      expect(errMsg).toEqual('Missing request body');
    });

    it.todo('should handle a PUT request error');

    it('should perform a PUT request', async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL);
      const result = await request.put('', BODY);

      expect(fetch).toHaveBeenCalledWith(`${URL}/`, {
        method: 'PUT',
        body: JSON.stringify(BODY),
      });
      expect(result).toStrictEqual(expected);
    });

    it('should perform a PUT request on an endpoint', async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL);
      const result = await request.put(ENDPOINT, BODY);

      expect(fetch).toHaveBeenCalledWith(`${URL}/${ENDPOINT}`, {
        method: 'PUT',
        body: JSON.stringify(BODY),
      });
      expect(result).toStrictEqual(expected);
    });

    it('should perform a PUT request with headers', async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL, FETCH_OPTIONS);
      const result = await request.put('', BODY);

      expect(fetch).toHaveBeenCalledWith(`${URL}/`, {
        ...FETCH_OPTIONS,
        method: 'PUT',
        body: JSON.stringify(BODY),
      });
      expect(result).toStrictEqual(expected);
    });
  });

  describe('# post', () => {
    it('should throw when no body was provided', async () => {
      expect.assertions(1);

      let errMsg = 'Method did not threw rejection';

      try {
        const request = new Request(URL);
        await request.post();
      } catch (err) {
        errMsg = err.message;
      }

      expect(errMsg).toEqual('Missing request body');
    });

    it.todo('should handle a POST request error');

    it('should perform a POST request', async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL);
      const result = await request.post('', BODY);

      expect(fetch).toHaveBeenCalledWith(`${URL}/`, {
        method: 'POST',
        body: JSON.stringify(BODY),
      });
      expect(result).toStrictEqual(expected);
    });

    it('should perform a POST request on an endpoint', async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL);
      const result = await request.post(ENDPOINT, BODY);

      expect(fetch).toHaveBeenCalledWith(`${URL}/${ENDPOINT}`, {
        method: 'POST',
        body: JSON.stringify(BODY),
      });
      expect(result).toStrictEqual(expected);
    });

    it('should perform a POST request with headers', async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL, FETCH_OPTIONS);
      const result = await request.post('', BODY);

      expect(fetch).toHaveBeenCalledWith(`${URL}/`, {
        ...FETCH_OPTIONS,
        method: 'POST',
        body: JSON.stringify(BODY),
      });
      expect(result).toStrictEqual(expected);
    });
  });

  describe('# delete', () => {
    it.todo('should handle a DELETE request error');

    it('should perform a DELETE request', async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL);
      const result = await request.delete();

      expect(fetch).toHaveBeenCalledWith(`${URL}/`, { method: 'DELETE' });
      expect(result).toStrictEqual(expected);
    });

    it('should perform a DELETE request on an endpoint', async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL);
      const result = await request.delete(ENDPOINT);

      expect(fetch).toHaveBeenCalledWith(`${URL}/${ENDPOINT}`, {
        method: 'DELETE',
      });
      expect(result).toStrictEqual(expected);
    });

    it('should perform a DELETE request with headers', async () => {
      const expected = { ok: 'OK' };

      fetch.mockResolvedValue(JSON.stringify(expected));

      const request = new Request(URL, FETCH_OPTIONS);
      const result = await request.delete();

      expect(fetch).toHaveBeenCalledWith(`${URL}/`, {
        ...FETCH_OPTIONS,
        method: 'DELETE',
      });
      expect(result).toStrictEqual(expected);
    });
  });
});
