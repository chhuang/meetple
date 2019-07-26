const flatten = require("lodash/flatten");
const { PubSub } = require("@google-cloud/pubsub");
const createPagesArray = require("./createPagesArray");
const getUrl = require("./getUrl");
const getGameIdsFromOnePage = require("./getGameIdsFromOnePage");

module.exports.scrapeGameIds = async (req, res) => {
  const { category, from, to, testMode } = req.body;

  const pages = createPagesArray({ from, to });

  const promises = pages.map(page =>
    getGameIdsFromOnePage(
      getUrl({
        category,
        pageNumber: page
      })
    )
  );

  const idArrays = await Promise.all(promises);
  const ids = flatten(idArrays);

  if (!testMode) {
    const TOPIC_NAME = "MEETPLE_SYNC_GAME_TO_DATABASE";
    const topic = new PubSub().topic(TOPIC_NAME);

    ids.forEach(async id => {
      await topic.publish(Buffer.from(""), {
        id
      });
      console.log(`Added ${id} to queue.`);
    });
  }

  res.json({
    ids
  });
};
