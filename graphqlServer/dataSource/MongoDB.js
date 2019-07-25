const { MongoClient } = require('mongodb');

module.exports = async uri => {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true
  });
  try {
    const db = await client.db();
    return db;
  } catch (err) {
    console.error(err);
  }
};
