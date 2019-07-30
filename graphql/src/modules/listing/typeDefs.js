const { gql } = require("apollo-server");

module.exports = gql`
  type Listing {
    id: ID!
    title: String!
    description: String!
    meta: ListingMeta
  }

  type ListingMeta {
    createdAt: Date
    updatedAt: Date
  }

  input ListingInput {
    title: String!
    description: String!
  }

  input UpdateListingInput {
    title: String
    description: String
  }

  extend type Query {
    listing(id: ID!): Listing
  }

  extend type Mutation {
    createListing(input: ListingInput!): Listing
    updateListing(id: ID!, input: UpdateListingInput): Listing
    deleteListing(id: ID!): Boolean
  }
`;
