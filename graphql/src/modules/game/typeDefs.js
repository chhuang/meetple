const { gql } = require("apollo-server");

module.exports = gql`
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
    assets: GameAssets
    info: GameInfo
    categories: [String]!
    mechanics: [String]!
    families: [String]!
    implementations: [String]!
    designers: [String]!
    artists: [String]!
    publishers: [String]!
    ranks(category: Category): [GameRank]!
    weight: GameWeight
    meta: GameMeta
  }

  type GameAssets {
    thumbnail: String
    image: String
  }

  type GameInfo {
    yearPublished: String
    minPlayers: String
    maxPlayers: String
    playingTime: String
    minPlayTime: String
    maxPlayTime: String
    minAge: String
  }

  type GameRank {
    name: String!
    friendlyName: String!
    value: String!
    averageRating: String!
  }

  type GameWeight {
    average: String!
    count: String!
  }

  type GameMeta {
    fetchedAt: Date!
  }

  extend type Query {
    game(id: ID!): Game
    topGames(category: Category = boardgame, limit: Int = 10): [Game]
    searchGames(name: String!, limit: Int = 10): [Game]
  }
`;
