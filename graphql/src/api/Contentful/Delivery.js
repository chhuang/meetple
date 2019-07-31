const contentful = require("contentful");

module.exports = ({ accessToken, spaceId, environmentId }) => {
  try {
    const client = contentful.createClient({
      accessToken,
      space: spaceId,
      environment: environmentId
    });

    return client;
  } catch (err) {
    throw new Error(`Contentful Delivery - connection failed - ${err}`);
  }
};
