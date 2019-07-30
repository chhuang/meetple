require("dotenv").config();
const MONGO_URI_TEST = process.env.MONGO_URI_TEST;

const { createTestClient } = require("apollo-server-testing");
const { gql } = require("apollo-server");
const connectMongoDB = require("../databases/MongoDB");
const createServer = require("../createServer");

let mongoDb, apolloServer, testClient, query;

beforeAll(async () => {
  try {
    mongoDb = await connectMongoDB(MONGO_URI_TEST);

    apolloServer = createServer({ mongoDb });

    testClient = await createTestClient(apolloServer);

    query = testClient.query;
  } catch (err) {
    console.error(err);
  }
}, 10000); // 10 seconds timeout limit

test("Game queries", async () => {
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

  expect(res.data.game).not.toBeNull();
  expect(res.data.topGames).not.toBeNull();
  expect(res.data.searchGames).not.toBeNull();
});
