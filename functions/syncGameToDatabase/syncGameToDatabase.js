require("dotenv").config();
const { MongoClient } = require("mongodb");
const fetchGameById = require("./fetchGameById");
const upsertToDatabase = require("./upsertToDatabase");

const syncGameToDatabase = async data => {
  const { id } = data.attributes;

  const MONGO_URI = process.env.MONGO_URI;

  try {
    const client = await MongoClient.connect(MONGO_URI, {
      useNewUrlParser: true
    });

    const db = client.db();

    const game = await fetchGameById({ id });

    await upsertToDatabase(db, game);
    console.log(`${game.id} synced`);

    // Find and sync all expansions
    await Promise.all(
      game.expansions.map(expansion => {
        return new Promise(async resolve => {
          const expansionGame = await fetchGameById({
            id: expansion.id,
            isExpansion: true
          });
          await upsertToDatabase(db, expansionGame);
          console.log(`${expansionGame.id} synced (expansion)`);
          resolve();
        });
      })
    );

    await client.close();
  } catch (err) {
    console.error(err);
  } finally {
    return Promise.resolve();
  }
};

module.exports.syncGameToDatabase = syncGameToDatabase;
