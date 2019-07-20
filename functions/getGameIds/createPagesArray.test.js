const createPagesArray = require('./createPagesArray');

describe('Test function: createPagesArray', () => {
  test('no argument', () => {
    expect(createPagesArray()).toStrictEqual([1]);
  });

  test('maxPage = 10', () => {
    expect(createPagesArray(10)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test('maxPage is a string', () => {
    expect(createPagesArray('string')).toStrictEqual([1]);
  });
});
