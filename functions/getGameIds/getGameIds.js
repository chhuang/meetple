const flatten = require('lodash/flatten');
const createPagesArray = require('./createPagesArray');
const getUrl = require('./getUrl');
const getGameIdsFromOnePage = require('./getGameIdsFromOnePage');

module.exports.getGameIds = async (req, res) => {
  const { category, maxPage } = req.body;

  const pages = createPagesArray(maxPage);

  const promises = pages.map(page =>
    getGameIdsFromOnePage(
      getUrl({
        category,
        pageNumber: page
      })
    )
  );

  const idSets = await Promise.all(promises);

  res.json({
    ids: flatten(idSets)
  });
};
