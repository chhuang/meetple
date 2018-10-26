const syncFromBGGToAlgolia = require('./syncFromBGGToAlgolia');

// gcloud functions deploy syncFromBGGToAlgoliaHTTP --runtime nodejs8 --trigger-http
exports.syncFromBGGToAlgoliaHTTP = (req, res) => {
  syncFromBGGToAlgolia(req.body.id, req.body.expandFamily)
    .then(algoliaObject => res.json(algoliaObject))
    .catch(err => res.json(err));
};

// gcloud functions deploy syncFromBGGToAlgoliaPubSub --runtime nodejs8 --trigger-resource SYNC_FROM_BGG_TO_ALGOLIA --trigger-event google.pubsub.topic.publish
exports.syncFromBGGToAlgoliaPubSub = (data, context) => {
  const pubSubAttributes = data.attributes;
  if (pubSubAttributes && pubSubAttributes.id) {
    syncFromBGGToAlgolia(pubSubAttributes.id, pubSubAttributes.expandFamily);
  }
};
