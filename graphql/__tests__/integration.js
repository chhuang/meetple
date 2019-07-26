require("dotenv").config();
const { createTestClient } = require("apollo-server-testing");
const { gql } = require("apollo-server");
const { createServer } = require("..");
const MONGO_URI_TEST = process.env.MONGO_URI_TEST;

test("fetches single launch", async () => {
  const server = createServer(MONGO_URI_TEST);

  const { query } = createTestClient(server);

  const GET_GAMES = gql`
    query {
      game(id: "220308") {
        name
      }
      topGames(category: boardgame) {
        name
      }
      searchGames(name: "a") {
        name
      }
    }
  `;

  const res = await query({ query: GET_GAMES });
  expect(typeof res.data.game).toStrictEqual("object");
  expect(typeof res.data.topGames).toStrictEqual("object");
  expect(typeof res.data.searchGames).toStrictEqual("object");
});
