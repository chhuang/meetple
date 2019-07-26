const createPagesArray = require("./createPagesArray");

describe("Test function: createPagesArray", () => {
  test("no argument", () => {
    expect(createPagesArray()).toStrictEqual([1]);
  });

  test("not a number", () => {
    expect(createPagesArray({ from: [], to: {} })).toStrictEqual([1]);
  });

  test("from 2 to 5", () => {
    expect(createPagesArray({ from: 2, to: 5 })).toStrictEqual([2, 3, 4, 5]);
  });

  test("from 5 to 2", () => {
    expect(createPagesArray({ from: 5, to: 2 })).toStrictEqual([5]);
  });
});
