const { createClient } = require("contentful-management");

module.exports = async ({ accessToken, spaceId, environmentId }) => {
  try {
    const client = createClient({ accessToken });

    const space = await client.getSpace(spaceId);

    const environment = await space.getEnvironment(environmentId);

    return environment;
  } catch (err) {
    throw new Error(`Contentful Management - connection failed - ${err}`);
  }
};
