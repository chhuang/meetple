const { gql } = require("apollo-server");

module.exports = gql`
  type Listing {
    id: ID!
    name: String!
    description: String!
    meta: ListingMeta
  }

  type ListingMeta {
    createdAt: Date
    updatedAt: Date
  }

  input ListingInput {
    name: String!
    description: String!
  }

  extend type Query {
    listing(id: ID!): Listing
  }

  extend type Mutation {
    createListing(input: ListingInput!): Listing
  }
`;
