const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const upsertToDatabase = require("./upsertToDatabase");

const mongod = new MongoMemoryServer();
let client;

beforeAll(async () => {
  const MONGO_URI = await mongod.getConnectionString();
  client = await MongoClient.connect(MONGO_URI);
});

afterAll(async () => {
  await client.close();
  await mongod.stop();
});

test("Upsert logic", async () => {
  const db = client.db();

  const sample = { id: "test" };

  const result = await upsertToDatabase(db, sample);

  expect(result.ok).toBe(1);
});
