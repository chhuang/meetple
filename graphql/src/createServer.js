const { ApolloServer } = require("apollo-server");
const get = require("lodash/get");
const schema = require("./modules");

const createServer = ({
  mongoDb,
  contentfulDeliveryClient,
  contentfulManagementEnvironment
}) => {
  return new ApolloServer({
    schema,
    context: args => {
      const auth = get(args, "req.headers.authorization");
      return {
        db: mongoDb,
        api: {
          contentful: {
            delivery: contentfulDeliveryClient,
            management: contentfulManagementEnvironment
          }
        },
        auth
      };
    },
    formatError: error => {
      console.error(error); // for logging
      return error;
    },
    debug: process.env.NODE_ENV !== "production"
  });
};

module.exports = createServer;
