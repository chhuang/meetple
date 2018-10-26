const getThings = require('./getThings');
const getFamilies = require('./getFamilies');
const algoliasearch = require('algoliasearch');

const syncFromBGGToAlgolia = (id, expandFamily) => {
  const client = algoliasearch('R7R9RSL45J', '45f03df97bafcc628369aa2516333498');
  const index = client.initIndex('things');

  let _response;

  return getThings(id, expandFamily)
    .then(thingsRes => {
      _response  = thingsRes;

      if (!expandFamily) {
        return Promise.resolve(null);
      } else if (_response.familyIds.length === 0) {
        return Promise.resolve(null);
      } else {
        const familyId = _response.familyIds.join(',');
        return getFamilies(familyId);
      }
    })
    .then(familiesRes => {
      if (!familiesRes) {
        return Promise.resolve(null);
      } else {
        const familyThingId = familiesRes.join(',');
        return getThings(familyThingId);
      }
    })
    .then(familyThingsRes => {
      if (!familyThingsRes) {
        return Promise.resolve(null);
      } else {
        _response.things = _response.things.concat(familyThingsRes.things);
        return Promise.resolve(null);
      }
    })
    .then(() => index.saveObjects(_response.things.map(thing => ({
      ...thing,
      objectID: thing.id
    }))))
    .then(algoliaResponse => Promise.resolve(algoliaResponse))
    .catch(err => Promise.reject(err));
}

// dev test
// syncFromBGGToAlgolia('161936', true)
//   .then(algoliaResponse => console.log(algoliaResponse))
//   .catch(err => console.log(err));

module.exports = syncFromBGGToAlgolia;
