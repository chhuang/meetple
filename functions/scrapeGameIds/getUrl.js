module.exports = args => {
  if (!args) {
    return 'https://boardgamegeek.com/browse/boardgame/page/1';
  }

  let { category, pageNumber = 1 } = args;

  pageNumber = parseInt(pageNumber) || 1;

  const CATEGORIES = [
    'strategygames',
    'partygames',
    'familygames',
    'abstracts',
    'wargames',
    'childrensgames',
    'thematic',
    'cgs'
  ];

  if (!CATEGORIES.includes(category)) {
    return `https://boardgamegeek.com/browse/boardgame/page/${pageNumber}`;
  }

  return `https://boardgamegeek.com/${category}/browse/boardgame/page/${pageNumber}`;
};
