import axios from 'axios';
import { getMongodbData as getMapData } from '../mapReducer';

// Mock axios
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('mapReducer getMongodbData', () => {
  const mockResponse = {
    data: {
      res: [
        { name: 'Park A', latitude: 22.28, longitude: 114.15 },
        { name: 'Park B', latitude: 22.27, longitude: 114.17 },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (mockedAxios.post as jest.Mock).mockResolvedValue(mockResponse);
  });

  it('should call axios.post with empty body and config as third argument', async () => {
    await getMapData();
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.any(String),
      {},
      expect.objectContaining({ headers: { 'Content-Type': 'application/json' } })
    );
  });

  it('should return a flat CarParkInfo array', async () => {
    const result = await getMapData();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockResponse.data.res);
  });

  it('should return all items from the response', async () => {
    const result = await getMapData();
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('name', 'Park A');
    expect(result[1]).toHaveProperty('name', 'Park B');
  });
});
