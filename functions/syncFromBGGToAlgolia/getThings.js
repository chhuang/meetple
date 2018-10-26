const axios = require('axios');
const xml2js = require('xml2js');

const parseXML = xml => new Promise((resolve, reject) => {
  xml2js.parseString(xml, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

// test id 230802
const getThings = (id, expandFamily) => {
  return axios
    .get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${id}&stats=1`)
    .then(res => parseXML(res.data))
    .then(res => {
      if (!Array.isArray(res.items.item)) {
        return Promise.reject({ message: 'Thing not found.' });
      } else {
        const things = res.items.item.map(thing => ({
          id: thing.$.id || '',
          type: thing.$.type || '',
          thumbnail: thing.thumbnail ? thing.thumbnail[0] : '',
          image: thing.image ? thing.image[0] : '',
          name: thing.name ? thing.name[0].$.value : '',
          description: thing.description ? thing.description[0] : '',
          yearpublished: thing.yearpublished ? thing.yearpublished[0].$.value : '',
          minplayers: thing.minplayers ? thing.minplayers[0].$.value : '',
          maxplayers: thing.maxplayers ? thing.maxplayers[0].$.value : '',
          playingtime: thing.playingtime ? thing.playingtime[0].$.value : '',
          minplaytime: thing.minplaytime ? thing.minplaytime[0].$.value : '',
          maxplaytime: thing.maxplaytime ? thing.maxplaytime[0].$.value : '',
          minage: thing.minage ? thing.minage[0].$.value : '',
          poll: Array.isArray(thing.poll) ? thing.poll.map(item => ({
            name: item.$.name,
            title: item.$.title,
            totalvotes: item.$.totalvotes,
            results: Array.isArray(item.results) ? item.results.map(result => ({
              numplayers: (result.$ && result.$.numplayers) ? result.$.numplayers : undefined,
              result: Array.isArray(result.result) ? result.result.map(resultItem => ({
                value: resultItem.$.value,
                numvotes: resultItem.$.numvotes
              })) : []
            })) : []
          })) : undefined,
          link: Array.isArray(thing.link) ? thing.link.map(item => ({
            type: item.$.type,
            id: item.$.id,
            value: item.$.value
          })) : undefined,
          statistics: Array.isArray(thing.statistics) ? {
            usersrated: thing.statistics[0].ratings[0].usersrated[0].$.value,
            average: thing.statistics[0].ratings[0].average[0].$.value,
            bayesaverage: thing.statistics[0].ratings[0].bayesaverage[0].$.value,
            ranks: thing.statistics[0].ratings[0].ranks[0].rank.map(rankItem => ({
              type: rankItem.$.type,
              id: rankItem.$.id,
              name: rankItem.$.name,
              friendlyname: rankItem.$.friendlyname,
              value: rankItem.$.value,
              bayesaverage: rankItem.$.bayesaverage
            })),
            stddev: thing.statistics[0].ratings[0].stddev[0].$.value,
            median: thing.statistics[0].ratings[0].median[0].$.value,
            owned: thing.statistics[0].ratings[0].owned[0].$.value,
            trading: thing.statistics[0].ratings[0].trading[0].$.value,
            wanting: thing.statistics[0].ratings[0].wanting[0].$.value,
            wishing: thing.statistics[0].ratings[0].wishing[0].$.value,
            numcomments: thing.statistics[0].ratings[0].numcomments[0].$.value,
            numweights: thing.statistics[0].ratings[0].numweights[0].$.value,
            averageweight: thing.statistics[0].ratings[0].averageweight[0].$.value
          } : undefined
        }));

        const output = { things };

        if (expandFamily) {
          const families = things[0].link && things[0].link.filter(linkItem => linkItem.type === 'boardgamefamily');
          output.familyIds = families ? families.map(family => family.id) : [];
        }

        return Promise.resolve(output);
      }
    })
    .catch(err => Promise.reject(err));
};

// dev test
// getThings('174430', true)
// .then(res => console.log(JSON.stringify(res, null, 2)));

module.exports = getThings;
