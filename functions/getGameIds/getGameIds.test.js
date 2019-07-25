const { getGameIds } = require('./getGameIds');

describe('Test function: getGameIds', () => {
  test('Empty req body', async () => {
    let result;
    await getGameIds(
      { body: { testMode: true } },
      {
        json: res => {
          result = res.ids;
        }
      }
    );
    expect(result).toHaveLength(100);
  });

  test('no category, page 1', async () => {
    let result;
    await getGameIds(
      { body: { testMode: true, from: 1, to: 1 } },
      {
        json: res => {
          result = res.ids;
        }
      }
    );
    expect(result).toHaveLength(100);
  });

  test('strategygames, page 2,3', async () => {
    let result;
    await getGameIds(
      { body: { testMode: true, category: 'strategygames', from: 2, to: 3 } },
      {
        json: res => {
          result = res.ids;
        }
      }
    );
    expect(result).toHaveLength(200);
  });
});
