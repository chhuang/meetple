const PubSub = require('@google-cloud/pubsub');

const pushSyncMessage = attributes => {
  const projectId = 'fifth-inkwell-181305';

  const pubsubClient = new PubSub({ projectId });

  const topicName = 'SYNC_FROM_BGG_TO_ALGOLIA';

  const topic = pubsubClient.topic(topicName);

  const publisher = topic.publisher();

  const message = Buffer.from('Message (not used)');

  return publisher
    .publish(message, attributes)
    .then(messageId => Promise.resolve(messageId))
    .catch(err => Promise.reject(err));
};

// dev test
// pushSyncMessage({
//   id: '77'
// }).then(a => console.log(a))
// .catch(err => console.log(err));

// dev test
// Promise
//   .all([
//     {
//       "id": "174430",
//       "expandFamily": "true"
//     },
//     {
//       "id": "161936",
//       "expandFamily": "true"
//     },
//     {
//       "id": "187645",
//       "expandFamily": "true"
//     },
//     {
//       "id": "180263",
//       "expandFamily": "true"
//     },
//     {
//       "id": "55690",
//       "expandFamily": "true"
//     }
//   ].map(attribute => pushSyncMessage(attribute)))
//   .then(responses => console.log(responses))
//   .catch(err => console.log(err));

module.exports = pushSyncMessage;
