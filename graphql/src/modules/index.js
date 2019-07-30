const { makeExecutableSchema } = require("graphql-tools");

const core = require("./core");
const game = require("./game");

module.exports = makeExecutableSchema({
  typeDefs: [core.typeDefs, game.typeDefs],
  resolvers: [core.resolvers, game.resolvers]
});
