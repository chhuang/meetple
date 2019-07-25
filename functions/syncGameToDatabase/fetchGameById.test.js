const fetchGameById = require('./fetchGameById');

describe('Test function: fetchGameById', () => {
  test('No argument', async () => {
    const result = await fetchGameById();
    expect(result).toStrictEqual({});
  });

  test('ID undefined', async () => {
    const result = await fetchGameById({});
    expect(result).toStrictEqual({});
  });

  test('ID is not string or number', async () => {
    const result = await fetchGameById({ id: true });
    expect(result).toStrictEqual({});
  });

  test('Invalid ID', async () => {
    const result = await fetchGameById({ id: -1 });
    expect(result).toStrictEqual({});
  });

  test('ID 220308', async () => {
    const result = await fetchGameById({ id: 220308 });
    expect(typeof result).toStrictEqual('object');
    expect(result.id).toStrictEqual('220308');
    expect(typeof result.isHot).toStrictEqual('boolean');
    expect(result.isHot).toStrictEqual(false);
    expect(typeof result.meta).toStrictEqual('object');
    expect(typeof result.meta.fetchedAt).toStrictEqual('object');
  });
});
