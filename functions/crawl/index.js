const axios = require('axios');
const cheerio = require('cheerio');

const CATEGORIES = [
  'strategygames',
  // 'partygames',
  // 'familygames',
  // 'abstracts',
  // 'wargames',
  // 'childrensgames',
  // 'thematic',
  // 'cgs'
];

const PAGES = Array(50).fill().map((x, i) => i + 1);

const getIds = (category, page) => {
  return axios
    .get(category
      ?
      `https://boardgamegeek.com/${category}/browse/boardgame/page/${page}`
      :
      `https://boardgamegeek.com/browse/boardgame/page/${page}`
    )
    .then(res => {
      const $ = cheerio.load(res.data);

      const collectionItems = $('table#collectionitems');

      const collectionItemsTrs = collectionItems.find('tr');

      collectionItemsTrs.each(function(i, elem) {
        const row = $(this).find('.collection_objectname');

        const href = $(row).find('a').attr('href');

        let id = '';

        if (href) {
          id = href.replace('/boardgame/', '').replace(/\/.+/g, '');
        }
        console.log(id);
      });
    })
    .catch(err => console.log(err));
};

const crawl = () => {
  CATEGORIES.forEach(category => {
    PAGES.forEach(page => {
      // getIds(category, page);
      getIds(null, page);
    });
  });
};

crawl();
