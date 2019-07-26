const { ApolloServer } = require("apollo-server");
const { mergeSchemas } = require("graphql-tools");
const get = require("lodash/get");
const gameSchema = require("./game");
const connectMongoDB = require("./dataSource/MongoDB");
const MONGO_URI = process.env.MONGO_URI;

const createServer = mongoUri => {
  return new ApolloServer({
    schema: mergeSchemas({
      schemas: [gameSchema]
    }),
    context: async args => {
      const db = await connectMongoDB(mongoUri);
      const auth = get(args, "req.headers.authorization");
      return { db, auth };
    },
    debug: process.env.NODE_ENV !== "production"
  });
};

module.exports = { createServer };

(async () => {
  const server = createServer(MONGO_URI);

  const serverInfo = await server.listen({ port: process.env.PORT || 4000 });

  console.log(`GraphQL Server started at ${serverInfo.url}`);
})();
