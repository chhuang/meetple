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
    context: async () => {
      const db = await connectMongoDB(MONGO_URI);
      return { db };
    }
  });

  const serverInfo = await server.listen();

  console.log(`GraphQL Server started at ${serverInfo.url}`);
})();
