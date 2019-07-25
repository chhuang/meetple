const getUrl = require('./getUrl');

describe('Test function: getUrl', () => {
  test('No argument', () => {
    expect(getUrl()).toBe('https://boardgamegeek.com/browse/boardgame/page/1');
  });

  test('category: strategygames', () => {
    expect(getUrl({ category: 'strategygames' })).toBe(
      'https://boardgamegeek.com/strategygames/browse/boardgame/page/1'
    );
  });

  test('pageNumber: 2', () => {
    expect(getUrl({ pageNumber: 2 })).toBe(
      'https://boardgamegeek.com/browse/boardgame/page/2'
    );
  });

  test('category: strategygames, pageNumber: 3', () => {
    expect(getUrl({ category: 'strategygames', pageNumber: 3 })).toBe(
      'https://boardgamegeek.com/strategygames/browse/boardgame/page/3'
    );
  });

  test('category: no_in_list, pageNumber: 3', () => {
    expect(getUrl({ category: 'no_in_list', pageNumber: 3 })).toBe(
      'https://boardgamegeek.com/browse/boardgame/page/3'
    );
  });

  test('category: strategygames, pageNumber: a_string', () => {
    expect(getUrl({ category: 'strategygames', pageNumber: 'a_string' })).toBe(
      'https://boardgamegeek.com/strategygames/browse/boardgame/page/1'
    );
  });

  test('category: no_in_list, pageNumber: a_string', () => {
    expect(getUrl({ category: 'no_in_list', pageNumber: 'a_string' })).toBe(
      'https://boardgamegeek.com/browse/boardgame/page/1'
    );
  });
});
