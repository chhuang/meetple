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
        const things = res.items.item.map(thing => {

          const bggLinks = Array.isArray(thing.link) ? thing.link.map(linkItem => linkItem.$) : [];

          return ({
            id: thing.$.id || '',
            type: thing.$.type || '',
            name: thing.name ? thing.name[0].$.value : '',
            description: thing.description ? thing.description[0] : '',
            
            image: thing.image ? thing.image[0] : '',
            thumbnail: thing.thumbnail ? thing.thumbnail[0] : '',
  
            designers: bggLinks.filter(link => link.type === 'boardgamedesigner'),
            artists: bggLinks.filter(link => link.type === 'boardgameartist'),
            publishers: bggLinks.filter(link => link.type === 'boardgamepublisher'),
            categories: bggLinks.filter(link => link.type === 'boardgamecategory'),
            mechanics: bggLinks.filter(link => link.type === 'boardgamemechanic'),
            families: bggLinks.filter(link => link.type === 'boardgamefamily'),
            
            specs: {
              yearPublished: thing.yearpublished ? parseFloat(thing.yearpublished[0].$.value) : null,
              minPlayers: thing.minplayers ? parseFloat(thing.minplayers[0].$.value) : null,
              maxPlayers: thing.maxplayers ? parseFloat(thing.maxplayers[0].$.value) : null,
              playingTime: thing.playingtime ? parseFloat(thing.playingtime[0].$.value) : null,
              minPlayTime: thing.minplaytime ? parseFloat(thing.minplaytime[0].$.value) : null,
              maxPlayTime: thing.maxplaytime ? parseFloat(thing.maxplaytime[0].$.value) : null,
              minAge: thing.minage ? parseFloat(thing.minage[0].$.value) : null,
            },
  
            stats: Array.isArray(thing.statistics) ? {
              weight: parseFloat(thing.statistics[0].ratings[0].averageweight[0].$.value),
              rating: parseFloat(thing.statistics[0].ratings[0].average[0].$.value),
              usersRated: parseFloat(thing.statistics[0].ratings[0].usersrated[0].$.value),
              ranks: thing.statistics[0].ratings[0].ranks[0].rank.map(rankItem => rankItem.$)
            } : undefined
          });
        });

        const output = { things };

        if (expandFamily) {
          // const families = things[0].link && things[0].link.filter(linkItem => linkItem.type === 'boardgamefamily');
          // output.familyIds = families ? families.map(family => family.id) : [];
        }

        return Promise.resolve(output);
      }
    })
    .catch(err => Promise.reject(err));
};

// dev test
// getThings('174430')
// .then(res => console.log(JSON.stringify(res, null, 2)));

module.exports = getThings;
