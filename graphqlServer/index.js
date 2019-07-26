const { ApolloServer } = require('apollo-server');
const { mergeSchemas } = require('graphql-tools');
const gameSchema = require('./game');
const connectMongoDB = require('./dataSource/MongoDB');
const MONGO_URI = process.env.MONGO_URI;

(async () => {
  const server = new ApolloServer({
    schema: mergeSchemas({
      schemas: [gameSchema]
    }),
    context: async ({ req }) => {
      const db = await connectMongoDB(MONGO_URI);
      const auth = req.headers.authorization;
      return { db, auth };
    },
    debug: process.env.NODE_ENV !== 'production'
  });

  const serverInfo = await server.listen();

  console.log(`GraphQL Server started at ${serverInfo.url}`);
})();
