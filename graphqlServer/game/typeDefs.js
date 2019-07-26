const { gql } = require('apollo-server');

module.exports = gql`
  scalar Date

  enum Category {
    boardgame
    strategygames
    partygames
    familygames
    abstracts
    wargames
    childrensgames
    thematic
    cgs
  }

  type Game {
    id: ID!
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
    ranks(category: Category): [Rank]!
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
    fetchedAt: Date!
  }

  type Query {
    game(id: String!): Game
    topGames(category: Category = boardgame, limit: Int = 10): [Game]
    searchGames(name: String!, limit: Int = 10): [Game]
  }
`;
