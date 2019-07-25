const { gql } = require('apollo-server');

module.exports = gql`
  scalar Date

  type Game {
    id: String!
    name: String!
    description: String
    assets: Assets
    info: Info
    categories: [String]!
    mechanics: [String]!
    families: [String]!
    implementations: [String]!
    designers: [String]!
    artists: [String]!
    publishers: [String]!
    ranks: [Rank]!
    weight: Weight
    meta: Meta
  }

  type Assets {
    thumbnail: String
    image: String
  }

  type Info {
    yearPublished: String
    minPlayers: String
    maxPlayers: String
    playingTime: String
    minPlayTime: String
    maxPlayTime: String
    minAge: String
  }

  type Rank {
    name: String!
    friendlyName: String!
    value: String!
    averageRating: String!
  }

  type Weight {
    average: String!
    count: String!
  }

  type Meta {
    fetchAt: Date!
  }

  type Query {
    game(id: String!): Game
  }
`;
