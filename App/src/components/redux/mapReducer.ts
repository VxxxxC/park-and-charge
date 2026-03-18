import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CarParkInfo } from './types';

const infoAPI = `${process.env.REACT_NATIVE_APP_EXPRESS_API}/getCarParkInfo`;
const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

interface mapState {
	mapData: CarParkInfo[];
	loading: 'is idle' | 'is pending' | 'is fulfilled' | 'is rejected';
}

const initialState: mapState = {
	mapData: [],
	loading: 'is idle',
};

export const fetchMap = createAsyncThunk('map/fetchMap', async () => {
	const data = await getMongodbData();
	// console.log({ data })
	return data;
});

const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		/* selectDistrict: (state, action: PayloadAction<typeof initialState>) => {
     fetchMap(action.payload)
    const mongodb: any = getMongodbData(action.payload);
     mongodb.then((res:any)=>{state.push(res)})
     console.log('<<state on reducer>> : ', state) 
   } */
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMap.pending, (state, action) => {
			// console.log('this is pending : ', action)
			state.loading = 'is pending';
		});
		builder.addCase(fetchMap.fulfilled, (state, action) => {
			// console.log('this is fulfilled : ', action)
			state.mapData = action.payload;
			state.loading = 'is fulfilled';
		});
		builder.addCase(fetchMap.rejected, (state, action) => {
			// console.log('this is rejected : ', action)
			state.loading = 'is rejected';
		});
	},
});

export async function getMongodbData(): Promise<CarParkInfo[]> {
	const response = await axios.post(infoAPI, {}, config);
	const data: CarParkInfo[] = response.data.res;
	return data;
}

export const mapReducer = mapSlice.reducer;
