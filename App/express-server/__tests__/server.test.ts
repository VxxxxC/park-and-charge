import express from 'express';
import cors from 'cors';
import request from 'supertest';

// Mock dotenv, mongodb, and axios to prevent real connections when importing routers
jest.mock('dotenv', () => ({ config: jest.fn() }));
jest.mock('mongodb', () => ({
  MongoClient: jest.fn().mockImplementation(() => ({
    db: jest.fn(),
    close: jest.fn(),
  })),
}));
jest.mock('axios', () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn() },
}));

// Use fake timers to prevent setInterval in updateCarParkInfoAPI from leaking
jest.useFakeTimers();

describe('Express Server Setup', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(cors());

    app.get('/', (req, res) => {
      res.json('This is Park and Charge API by AWS EC2');
    });
  });

  it('should create an Express application', () => {
    expect(app).toBeDefined();
  });

  it('should respond with JSON at root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toBe('This is Park and Charge API by AWS EC2');
  });

  it('should include CORS headers', async () => {
    const response = await request(app).get('/');
    expect(response.headers['access-control-allow-origin']).toBe('*');
  });
});

describe('Router Modules', () => {
  it('should export updateCarChargeAPI as a Router', async () => {
    const { default: updateCarChargeAPI } = await import('../updateCarChargeInfoAPI');
    expect(updateCarChargeAPI).toBeDefined();
    // Express Router is a function
    expect(typeof updateCarChargeAPI).toBe('function');
  });

  it('should export getCarkParkInfo as a Router', async () => {
    const { default: carParkInfo } = await import('../getCarkParkInfo');
    expect(carParkInfo).toBeDefined();
    expect(typeof carParkInfo).toBe('function');
  });

  it('should export updateCarParkInfoAPI as a Router', async () => {
    const { default: updateAPI } = await import('../updateCarParkInfoAPI');
    expect(updateAPI).toBeDefined();
    expect(typeof updateAPI).toBe('function');
  });
});
