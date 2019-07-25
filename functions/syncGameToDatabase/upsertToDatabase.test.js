const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const upsertToDatabase = require('./upsertToDatabase');
const sampleConverted = require('./sampleConverted.json');

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

test('Upsert logic', async () => {
  const db = client.db();

  const sample = { id: 'A', foo: 'bar' };

  const resultA = await upsertToDatabase(db, sample);
  expect(resultA).toBe('inserted');

  const resultB = await upsertToDatabase(db, sample);
  expect(resultB).toBe('updated');
});

test('Insert sample', async () => {
  const db = client.db();

  const result = await upsertToDatabase(db, sampleConverted);
  expect(result).toBe('inserted');
});
