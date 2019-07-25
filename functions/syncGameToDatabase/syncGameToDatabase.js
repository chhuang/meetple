const { MongoClient } = require('mongodb');
const fetchGameById = require('./fetchGameById');
const upsertToDatabase = require('./upsertToDatabase');

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

    await client.close();
  } catch (err) {
    console.error(err);
  } finally {
    return Promise.resolve();
  }
};

module.exports.syncGameToDatabase = syncGameToDatabase;
