const pushSyncMessage = require('./pushSyncMessage');

// gcloud functions deploy pushSyncMessageHTTP --runtime nodejs8 --trigger-http
exports.pushSyncMessageHTTP = (req, res) => {
  const attributes = req.body.attributes;

  Promise
    .all(attributes.map(attribute => pushSyncMessage(attribute)))
    .then(responses => res.json(responses))
    .catch(err => res.json(err));
};
