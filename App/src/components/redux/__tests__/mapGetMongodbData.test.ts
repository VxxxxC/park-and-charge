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

  it('should call axios.post to fetch data', async () => {
    await getMapData();
    expect(mockedAxios.post).toHaveBeenCalled();
  });

  it('should return data wrapped in an array', async () => {
    const result = await getMapData();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should push the full response data into the list', async () => {
    const result = await getMapData();
    // The function pushes the entire data array as one element
    expect(result[0]).toEqual(mockResponse.data.res);
  });
});
