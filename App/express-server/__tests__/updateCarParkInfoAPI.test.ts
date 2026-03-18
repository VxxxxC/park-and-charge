import express from 'express';

// Mock axios
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn().mockResolvedValue({
      data: {
        results: [
          { name: 'Mock Park', district: '中西區', latitude: 22.28, longitude: 114.15 },
        ],
      },
    }),
  },
}));

// Mock mongodb
const mockInsertMany = jest.fn().mockResolvedValue({ insertedCount: 1 });
const mockDrop = jest.fn().mockResolvedValue(true);
const mockCollection = jest.fn().mockReturnValue({
  insertMany: mockInsertMany,
  drop: mockDrop,
});
const mockListCollections = jest.fn().mockReturnValue({
  toArray: jest.fn().mockResolvedValue([{ name: 'carParkInfo' }]),
});
const mockDb = jest.fn().mockReturnValue({
  collection: mockCollection,
  listCollections: mockListCollections,
});
const mockClose = jest.fn().mockResolvedValue(undefined);
const mockMongoClient = jest.fn().mockImplementation(() => ({
  db: mockDb,
  close: mockClose,
}));

jest.mock('mongodb', () => ({
  MongoClient: mockMongoClient,
}));

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

// Use fake timers to prevent setInterval from leaking
jest.useFakeTimers();

describe('updateCarParkInfoAPI Router', () => {
  it('should export a Router', async () => {
    const { default: updateAPI } = await import('../updateCarParkInfoAPI');
    expect(updateAPI).toBeDefined();
    expect(typeof updateAPI).toBe('function');
  });

  it('should be mountable on an express app', async () => {
    const { default: updateAPI } = await import('../updateCarParkInfoAPI');
    const app = express();
    app.use('/updateCarParkInfo', updateAPI);
    expect(app).toBeDefined();
  });
});
