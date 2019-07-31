const sortBy = require("lodash/sortBy");

module.exports = {
  Query: {
    game: async (obj, { id }, { db }) => {
      return await db.collection("games").findOne({ id });
    },

    topGames: async (obj, { category, limit }, { db }) => {
      const games = await db
        .collection("games")
        .find({ "ranks.name": category })
        .toArray();

      const sortedGames = sortBy(games, game =>
        parseInt(game.ranks.find(rank => rank.name === category).value)
      );

      return sortedGames.slice(0, limit);
    },

    searchGames: async (obj, { name, limit }, { db }) => {
      return await db
        .collection("games")
        .find({ name: new RegExp(name, "i") })
        .limit(limit)
        .toArray();
    }
  },

  Game: {
    ranks: (game, { category }) =>
      game.ranks.filter(rank => rank.name === category || !category)
  },

  GameExpansion: {
    game: async (game, args, { db }) => {
      return await db.collection("games").findOne({ id: game.id });
    }
  }
};
