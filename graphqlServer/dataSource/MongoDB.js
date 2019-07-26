const { MongoClient } = require('mongodb');

module.exports = async uri => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true
    });
    const db = await client.db();
    return db;
  } catch (err) {
    console.error(err);
  }
};
