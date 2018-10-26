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

const getFamilies = id => {
  return axios
    .get(`https://www.boardgamegeek.com/xmlapi2/family?id=${id}`)
    .then(res => parseXML(res.data))
    .then(res => {
      const idArrays = Array.isArray(res.items.item)
        ?
        res.items.item.map(
          family => family.link
            .filter(linkItem => linkItem.$ && linkItem.$.inbound === 'true')
            .map(linkItem => linkItem.$.id)
            .slice(0, 100)
        )
        :
        [];

      const output = [].concat.apply([], idArrays);

      return Promise.resolve(output);
    })
    .catch(err => Promise.reject(err));
};

// dev test
// getFamilies('5614,6485')
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

module.exports = getFamilies;
