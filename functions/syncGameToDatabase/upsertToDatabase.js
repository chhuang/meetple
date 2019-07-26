module.exports = async (db, data) => {
  const foundDocument = await db.collection("games").findOne({ id: data.id });

  if (!foundDocument) {
    await db.collection("games").insertOne(data);
    return "inserted";
  } else {
    await db
      .collection("games")
      .findOneAndUpdate({ id: data.id }, { $set: data });
    return "updated";
  }
};
