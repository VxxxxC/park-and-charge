import express from 'express';
import request from 'supertest';

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

// Mock mongodb
jest.mock('mongodb', () => ({
  MongoClient: jest.fn().mockImplementation(() => ({
    db: jest.fn(),
    close: jest.fn(),
  })),
}));

describe('updateCarChargeInfoAPI Router', () => {
  let app: express.Application;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetModules();
    const { default: updateCarChargeAPI } = await import('../updateCarChargeInfoAPI');
    app = express();
    app.use(express.json());
    app.use('/updateCarChargeInfoAPI', updateCarChargeAPI);
  });

  it('should export a Router', async () => {
    const { default: updateCarChargeAPI } = await import('../updateCarChargeInfoAPI');
    expect(updateCarChargeAPI).toBeDefined();
    expect(typeof updateCarChargeAPI).toBe('function');
  });

  it('should be mountable on an express app', () => {
    expect(app).toBeDefined();
  });

  it('should return 404 for undefined routes', async () => {
    const response = await request(app).get('/updateCarChargeInfoAPI');
    // Router exists but has no routes defined, so express returns 404
    expect(response.status).toBe(404);
  });
});
