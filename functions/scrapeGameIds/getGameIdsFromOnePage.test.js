const getGameIdsFromOnePage = require("./getGameIdsFromOnePage");

describe("Test function: getGameIdsFromOnePage", () => {
  test("No argument", async () => {
    const result = await getGameIdsFromOnePage();
    expect(result).toStrictEqual([]);
  });

  test("https://boardgamegeek.com/browse/boardgame/page/1", async () => {
    const result = await getGameIdsFromOnePage(
      "https://boardgamegeek.com/browse/boardgame/page/1"
    );
    expect(result).toHaveLength(100);
  });
});
