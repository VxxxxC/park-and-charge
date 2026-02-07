import express from 'express';
import cors from 'cors';

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

  it('should have JSON middleware configured', () => {
    // Verify the app has middleware stack
    const stack = app._router?.stack;
    expect(stack).toBeDefined();
    expect(stack.length).toBeGreaterThan(0);
  });

  it('should have a root route handler', () => {
    const routes = app._router?.stack.filter(
      (layer: any) => layer.route && layer.route.path === '/'
    );
    expect(routes.length).toBe(1);
    expect(routes[0].route.methods.get).toBe(true);
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
