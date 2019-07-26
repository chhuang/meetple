const parseXML = require("./parseXML");

describe("Test function: parseXML", () => {
  test("Without options", async () => {
    const result = await parseXML("<root>Foo bar</root>");
    expect(result.root).toStrictEqual("Foo bar");
  });

  test("With options", async () => {
    const result = await parseXML("<root> Foo bar </root>", { trim: true });
    expect(result.root).toStrictEqual("Foo bar");
  });
});
