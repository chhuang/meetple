const { getGameIds } = require('./getGameIds');

describe('Test function: getGameIds', () => {
  test('Empty req body', async () => {
    let result;
    await getGameIds(
      { body: {} },
      {
        json: res => {
          result = res.ids;
        }
      }
    );
    expect(result).toHaveLength(100);
  });

  test('no category, 1 pages', async () => {
    let result;
    await getGameIds(
      { body: { maxPage: 1 } },
      {
        json: res => {
          result = res.ids;
        }
      }
    );
    expect(result).toHaveLength(100);
  });

  test('strategygames, 2 pages', async () => {
    let result;
    await getGameIds(
      { body: { category: 'strategygames', maxPage: 2 } },
      {
        json: res => {
          result = res.ids;
        }
      }
    );
    expect(result).toHaveLength(200);
  });
});
