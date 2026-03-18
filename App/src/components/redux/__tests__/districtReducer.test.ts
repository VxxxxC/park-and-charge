import { configureStore } from '@reduxjs/toolkit';
import { districtReducer, fetchDistrict } from '../districtReducer';

// Mock axios to avoid real network requests
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

describe('districtReducer', () => {
  it('should return the initial state', () => {
    const store = configureStore({
      reducer: { district: districtReducer },
    });

    expect(store.getState().district).toEqual({
      districtData: [],
      loading: 'is idle',
    });
  });

  it('should set loading to "is pending" when fetchDistrict is pending', () => {
    const store = configureStore({
      reducer: { district: districtReducer },
    });

    store.dispatch({ type: fetchDistrict.pending.type });

    expect(store.getState().district.loading).toBe('is pending');
  });

  it('should set loading to "is fulfilled" and update data when fetchDistrict is fulfilled', () => {
    const store = configureStore({
      reducer: { district: districtReducer },
    });

    const mockData = [
      { name: 'Test Park', district: '中西區', latitude: 22.28, longitude: 114.15 },
    ];

    store.dispatch({
      type: fetchDistrict.fulfilled.type,
      payload: mockData,
    });

    expect(store.getState().district.loading).toBe('is fulfilled');
    expect(store.getState().district.districtData).toEqual(mockData);
  });

  it('should set loading to "is rejected" when fetchDistrict is rejected', () => {
    const store = configureStore({
      reducer: { district: districtReducer },
    });

    store.dispatch({ type: fetchDistrict.rejected.type });

    expect(store.getState().district.loading).toBe('is rejected');
  });
});
