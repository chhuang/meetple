const { ApolloServer } = require("apollo-server");
const get = require("lodash/get");
const schema = require("./modules");

const createServer = ({ mongoDb }) => {
  return new ApolloServer({
    schema,
    context: args => {
      const auth = get(args, "req.headers.authorization");
      return { db: mongoDb, auth };
    },
    formatError: error => {
      console.error(error); // for logging
      return error;
    },
    debug: process.env.NODE_ENV !== "production"
  });
};

module.exports = createServer;
