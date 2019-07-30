require("dotenv").config();
const {
  MONGO_URI,
  CONTENTFUL_DELIVERY_ACCESS_TOKEN,
  CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT_ID
} = process.env;

const connectMongoDB = require("./databases/MongoDB");
const createContentfulDeliveryClient = require("./api/Contentful/Delivery");
const createContentfulManagementEnvironment = require("./api/Contentful/Management");
const createServer = require("./createServer");

(async () => {
  try {
    console.log("MongoDB - connecting");
    const mongoDb = await connectMongoDB(MONGO_URI);
    console.log("MongoDB - connected");

    console.log("Contentful Delivery - initialising");
    const contentfulDeliveryClient = createContentfulDeliveryClient({
      accessToken: CONTENTFUL_DELIVERY_ACCESS_TOKEN,
      spaceId: CONTENTFUL_SPACE_ID,
      environmentId: CONTENTFUL_ENVIRONMENT_ID
    });
    console.log("Contentful Delivery - configured");

    console.log("Contentful Management - initialising");
    const contentfulManagementEnvironment = await createContentfulManagementEnvironment(
      {
        accessToken: CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
        spaceId: CONTENTFUL_SPACE_ID,
        environmentId: CONTENTFUL_ENVIRONMENT_ID
      }
    );
    console.log("Contentful Management - configured");

    console.log("Apollo Server - starting");
    const server = await createServer({
      mongoDb,
      contentfulDeliveryClient,
      contentfulManagementEnvironment
    });

    const serverInfo = await server.listen({ port: process.env.PORT || 4000 });

    console.log(`Apollo Server - started at ${serverInfo.url}`);
  } catch (err) {
    console.error(err);
  }
})();
