module.exports = async (db, data) => {
  const doc = await db.collection("games").findOneAndReplace(
    {
      id: data.id
    },
    data,
    { upsert: true }
  );
  return doc;
};
