const sortBy = require('lodash/sortBy');
const { UserInputError } = require('apollo-server');

module.exports = {
  Query: {
    game: async (obj, { id }, { db }) => {
      return await db.collection('games').findOne({ id });
    },

    games: async (obj, { category, name, limit }, { db }) => {
      if (!category && !name) {
        throw new UserInputError('Need either category or name.');
      }
      if (category) {
        const games = await db
          .collection('games')
          .find({ 'ranks.name': category })
          .toArray();

        const sortedGames = sortBy(games, game =>
          parseInt(game.ranks.find(rank => rank.name === category).value)
        );

        return sortedGames.slice(0, limit);
      } else if (name) {
        const games = await db
          .collection('games')
          .find({ name: new RegExp(name, 'i') })
          .limit(limit)
          .toArray();
        return games;
      }
    }
  },

  Game: {
    ranks: (game, { category }) =>
      game.ranks.filter(rank => rank.name === category || !category)
  }
};
