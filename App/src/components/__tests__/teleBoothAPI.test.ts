import axios from 'axios';

// Mock axios
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

// Mock papaparse
jest.mock('papaparse', () => ({
  __esModule: true,
  default: {
    parse: jest.fn().mockReturnValue({
      data: [
        { KIOSK_ID: '001', OPERATOR: 'TestOp', REGION: 'HK', DISTRICT: 'Central', LOCALITY: 'Central', STREET: 'Queen Rd' },
        { KIOSK_ID: '002', OPERATOR: 'TestOp2', REGION: 'KLN', DISTRICT: 'MK', LOCALITY: 'MK', STREET: 'Nathan Rd' },
      ],
    }),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TeleBoothAPI', () => {
  const csvData = 'KIOSK_ID,OPERATOR,REGION\n001,TestOp,HK';

  beforeEach(() => {
    jest.clearAllMocks();
    (mockedAxios.get as jest.Mock).mockResolvedValue({ data: csvData });
  });

  it('should fetch and parse tele booth data', async () => {
    const TeleBoothAPI = (await import('../teleBoothAPI')).default;
    const result = await TeleBoothAPI();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
  });

  it('should call axios.get with the gov API URL', async () => {
    const TeleBoothAPI = (await import('../teleBoothAPI')).default;
    await TeleBoothAPI();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('api.data.gov.hk'),
      expect.any(Object)
    );
  });

  it('should return data with expected structure', async () => {
    const TeleBoothAPI = (await import('../teleBoothAPI')).default;
    const result = await TeleBoothAPI();
    expect(result[0]).toHaveProperty('KIOSK_ID');
    expect(result[0]).toHaveProperty('OPERATOR');
    expect(result[0]).toHaveProperty('REGION');
  });

  it('should parse CSV using PapaParse with header option', async () => {
    const Papa = require('papaparse').default;
    const TeleBoothAPI = (await import('../teleBoothAPI')).default;
    await TeleBoothAPI();
    expect(Papa.parse).toHaveBeenCalledWith(csvData, { header: true });
  });
});
