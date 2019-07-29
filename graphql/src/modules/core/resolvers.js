const { GraphQLScalarType } = require("graphql");

module.exports = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",

    serialize: value => new Date(value),

    parseValue: value => new Date(value),

    parseLiteral: ast => {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  })
};
