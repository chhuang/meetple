const axios = require("axios");
const get = require("lodash/get");
const parseXML = require("./parseXML");
const convertToMeetpleSchema = require("./convertToMeetpleSchema");

module.exports = async args => {
  if (!args) {
    return {};
  }

  const { id, isHot = false, isExpansion = false } = args;
  if (!id || !["number", "string"].includes(typeof id)) {
    return {};
  }

  /**
   * Fetch game data from BBG API
   */
  const url = `https://www.boardgamegeek.com/xmlapi2/thing?id=${id.toString()}&stats=1`;
  const request = await axios.get(url);
  const gameInXML = request.data;
  const gameInJSON = await parseXML(gameInXML, { trim: true });

  const original = get(gameInJSON, "items.item[0]");

  if (!original) {
    return {};
  }

  /**
   * Convert BBG data to Meetple schema
   */
  const meetpleSchema = convertToMeetpleSchema(original);

  /**
   * Construct meta data
   */
  const meta = { fetchedAt: new Date() };

  return {
    id: id.toString(),
    isHot,
    isExpansion,
    ...meetpleSchema,
    meta
  };
};
