const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');
const cheerio = require('cheerio');

const getGameIdsFromOnePage = async url => {
  let ids = [];

  if (!url) {
    return ids;
  }

  const pageRequest = await axios.get(url);

  const $ = cheerio.load(pageRequest.data);

  const collectionItems = $('table#collectionitems');

  const collectionItemsTrs = collectionItems.find('tr');

  // loop for each game row
  collectionItemsTrs.each(function() {
    const gameTitle = $(this).find('.collection_objectname');

    const href = $(gameTitle)
      .find('a')
      .attr('href');

    let id = '';

    if (href) {
      id = href.replace(/^\/boardgame\/(\d+)\/.*$/g, '$1');
      ids.push(id);
    }
  });

  return ids;
};

module.exports = getGameIdsFromOnePage;
