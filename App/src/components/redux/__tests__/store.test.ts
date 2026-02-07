import { configureStore } from '@reduxjs/toolkit';
import { districtReducer } from '../districtReducer';
import { mapReducer } from '../mapReducer';

describe('Redux Store', () => {
  it('should create a store with district and map reducers', () => {
    const store = configureStore({
      reducer: {
        district: districtReducer,
        map: mapReducer,
      },
    });

    const state = store.getState();
    expect(state).toHaveProperty('district');
    expect(state).toHaveProperty('map');
  });

  it('should have correct initial state for district reducer', () => {
    const store = configureStore({
      reducer: {
        district: districtReducer,
        map: mapReducer,
      },
    });

    const state = store.getState();
    expect(state.district).toEqual({
      districtData: [],
      loading: 'is idle',
    });
  });

  it('should have correct initial state for map reducer', () => {
    const store = configureStore({
      reducer: {
        district: districtReducer,
        map: mapReducer,
      },
    });

    const state = store.getState();
    expect(state.map).toEqual({
      mapData: [],
      loading: 'is idle',
    });
  });
});
