const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const upsertToDatabase = require('./upsertToDatabase');

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

test('a', async () => {
  const db = client.db();

  const sample = { id: 'A', foo: 'bar' };

  const resultA = await upsertToDatabase(db, sample);
  expect(resultA).toBe('inserted');

  const resultB = await upsertToDatabase(db, sample);
  expect(resultB).toBe('updated');
});
