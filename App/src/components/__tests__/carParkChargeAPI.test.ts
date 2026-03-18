import axios from 'axios';

// Mock axios
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CarParkChargeAPI', () => {
  const mockData = [
    { '充電站名稱': 'Station A', '地址': '123 Test Street' },
    { '充電站名稱': 'Station B', '地址': '456 Test Road' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (mockedAxios.get as jest.Mock).mockResolvedValue({ data: mockData });
  });

  it('should fetch EV charging station data', async () => {
    const CarParkChargeAPI = (await import('../carParkChargeAPI')).default;
    const result = await CarParkChargeAPI();
    expect(result).toEqual(mockData);
  });

  it('should call axios.get with the correct URL', async () => {
    const CarParkChargeAPI = (await import('../carParkChargeAPI')).default;
    await CarParkChargeAPI();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('api.data.gov.hk'),
      expect.any(Object)
    );
  });

  it('should pass Content-Type header', async () => {
    const CarParkChargeAPI = (await import('../carParkChargeAPI')).default;
    await CarParkChargeAPI();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  it('should return data from the response', async () => {
    const CarParkChargeAPI = (await import('../carParkChargeAPI')).default;
    const result = await CarParkChargeAPI();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
  });
});
