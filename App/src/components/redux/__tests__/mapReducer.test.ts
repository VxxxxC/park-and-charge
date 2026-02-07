import { configureStore } from '@reduxjs/toolkit';
import { mapReducer, fetchMap } from '../mapReducer';

// Mock axios to avoid real network requests
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

describe('mapReducer', () => {
  it('should return the initial state', () => {
    const store = configureStore({
      reducer: { map: mapReducer },
    });

    expect(store.getState().map).toEqual({
      mapData: [],
      loading: 'is idle',
    });
  });

  it('should set loading to "is pending" when fetchMap is pending', () => {
    const store = configureStore({
      reducer: { map: mapReducer },
    });

    store.dispatch({ type: fetchMap.pending.type });

    expect(store.getState().map.loading).toBe('is pending');
  });

  it('should set loading to "is fulfilled" and update data when fetchMap is fulfilled', () => {
    const store = configureStore({
      reducer: { map: mapReducer },
    });

    const mockData = [
      { name: 'Test Park', latitude: 22.28, longitude: 114.15 },
    ];

    store.dispatch({
      type: fetchMap.fulfilled.type,
      payload: mockData,
    });

    expect(store.getState().map.loading).toBe('is fulfilled');
    expect(store.getState().map.mapData).toEqual(mockData);
  });

  it('should set loading to "is rejected" when fetchMap is rejected', () => {
    const store = configureStore({
      reducer: { map: mapReducer },
    });

    store.dispatch({ type: fetchMap.rejected.type });

    expect(store.getState().map.loading).toBe('is rejected');
  });
});
