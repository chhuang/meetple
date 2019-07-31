const { makeExecutableSchema } = require("graphql-tools");

const core = require("./core");
const game = require("./game");
const listing = require("./listing");

module.exports = makeExecutableSchema({
  typeDefs: [core.typeDefs, game.typeDefs, listing.typeDefs],
  resolvers: [core.resolvers, game.resolvers, listing.resolvers]
});
