import axios from 'axios';
import { getMongodbData } from '../districtReducer';

// Mock axios
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getMongodbData', () => {
  const mockResponse = {
    data: {
      res: [
        { name: 'Park A', district: '中西區', latitude: 22.28, longitude: 114.15, address: { dcDistrict: '中西區' } },
        { name: 'Park B', district: '灣仔區', latitude: 22.27, longitude: 114.17, address: { dcDistrict: '灣仔區' } },
        { name: 'Park C', latitude: 22.30, longitude: 114.20, address: { dcDistrict: '東區' } },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (mockedAxios.post as jest.Mock).mockResolvedValue(mockResponse);
  });

  it('should return all data when district is "全部"', async () => {
    const result = await getMongodbData('全部');
    expect(result).toHaveLength(3);
    expect(result).toEqual(mockResponse.data.res);
  });

  it('should filter by district field', async () => {
    const result = await getMongodbData('灣仔區');
    expect(result).toHaveLength(1);
    expect(result[0].district).toBe('灣仔區');
  });

  it('should filter by address.dcDistrict when no district field', async () => {
    const result = await getMongodbData('東區');
    expect(result).toHaveLength(1);
    expect(result[0].address?.dcDistrict).toBe('東區');
  });

  it('should call axios.post with empty body and config as third argument', async () => {
    await getMongodbData('中西區');
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.any(String),
      {},
      expect.objectContaining({ headers: { 'Content-Type': 'application/json' } })
    );
  });

  it('should return empty array for non-matching district', async () => {
    const result = await getMongodbData('不存在的區');
    expect(result).toEqual([]);
  });
});
