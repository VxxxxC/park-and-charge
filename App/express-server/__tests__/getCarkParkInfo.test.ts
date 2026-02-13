import express from 'express';
import request from 'supertest';

// Mock mongodb
jest.mock('mongodb', () => {
  const mockClose = jest.fn().mockResolvedValue(undefined);
  const mockForEach = jest.fn().mockImplementation(async (callback: (item: any) => void) => {
    const items = [
      { name: 'Test Park 1', district: '中西區', latitude: 22.28, longitude: 114.15 },
      { name: 'Test Park 2', district: '灣仔區', latitude: 22.27, longitude: 114.17 },
    ];
    items.forEach(callback);
  });
  const mockFind = jest.fn().mockReturnValue({ forEach: mockForEach });
  const mockCollection = jest.fn().mockReturnValue({ find: mockFind });
  const mockDb = jest.fn().mockReturnValue({ collection: mockCollection });
  const mockMongoClient = jest.fn().mockImplementation(() => ({
    db: mockDb,
    close: mockClose,
  }));
  return { MongoClient: mockMongoClient };
});

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('getCarkParkInfo Router', () => {
  let app: express.Application;

  beforeEach(async () => {
    jest.clearAllMocks();
    // Reset module to get fresh imports
    jest.resetModules();
    const { default: carParkInfo } = await import('../getCarkParkInfo');
    app = express();
    app.use(express.json());
    app.use('/getCarParkInfo', carParkInfo);
  });

  it('should respond to POST request with car park data', async () => {
    const response = await request(app)
      .post('/getCarParkInfo')
      .send({});

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('res');
    expect(Array.isArray(response.body.res)).toBe(true);
  });

  it('should return car park items in the response', async () => {
    const response = await request(app)
      .post('/getCarParkInfo')
      .send({});

    expect(response.body.res).toHaveLength(2);
    expect(response.body.res[0]).toHaveProperty('name', 'Test Park 1');
    expect(response.body.res[1]).toHaveProperty('name', 'Test Park 2');
  });

  it('should close mongodb connection after query', async () => {
    const { MongoClient } = require('mongodb');
    await request(app).post('/getCarParkInfo').send({});
    
    const clientInstance = MongoClient.mock.results[0]?.value;
    expect(clientInstance.close).toHaveBeenCalled();
  });
});
