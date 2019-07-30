require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const connectMongoDB = require("./databases/MongoDB");
const createServer = require("./createServer");

(async () => {
  try {
    console.log("MongoDB - connecting");
    const mongoDb = await connectMongoDB(MONGO_URI);
    console.log("MongoDB - connected");

    console.log("Apollo Server - starting");
    const server = await createServer({ mongoDb });

    const serverInfo = await server.listen({ port: process.env.PORT || 4000 });

    console.log(`Apollo Server - started at ${serverInfo.url}`);
  } catch (err) {
    console.error(err);
  }
})();
