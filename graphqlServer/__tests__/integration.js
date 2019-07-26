const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const { createServer } = require('..');
const MONGO_URI_TEST = process.env.MONGO_URI_TEST;

test('fetches single launch', async () => {
  const server = createServer(MONGO_URI_TEST);

  const { query } = createTestClient(server);

  const GET_GAMES = gql`
    query {
      games(category: boardgame) {
        name
      }
    }
  `;

  const res = await query({ query: GET_GAMES });
  expect(typeof res.data.games).toStrictEqual('object');
});
