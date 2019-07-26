const parseString = require("xml2js").parseString;

module.exports = (xml, options) =>
  new Promise((resolve, reject) => {
    parseString(xml, options, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
