const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');

let mongoServer;

// 1. Start in-memory DB and connect Mongoose before running tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// 2. Clear database collections between individual tests
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

// 3. Close Mongoose connection and stop in-memory DB after all tests finish
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

// 4. Test Suites
describe('Server and DB Integration Tests', () => {
  
  it('should verify the server is up and connected to the mock DB', async () => {
    const res = await request(app).get('/api/status');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('online');
    expect(res.body.db).toBe(1); // 1 means connected in Mongoose readyState
  });

});
