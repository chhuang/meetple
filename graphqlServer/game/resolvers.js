module.exports = {
  Query: {
    game: async (obj, { id }, { db }) => {
      const game = await db.collection('games').findOne({ id });
      return game;
    }
  }
};
