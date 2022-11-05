import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const infoAPI = `${process.env.REACT_NATIVE_APP_EXPRESS_API}/getCarParkInfo`;

interface mapState {
	mapData: string[];
	loading: 'is idle' | 'is pending' | 'is fulfilled' | 'is rejected';
}

const initialState: mapState = {
	mapData: [],
	loading: 'is idle',
};

export const fetchMap = createAsyncThunk('map/fetchMap', async () => {
	const data: void | string[] = await getMongodbData();
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

export async function getMongodbData() {
	const response: any = await axios.post(infoAPI);
	type dataType = typeof response.data.res;
	const data: dataType = response.data.res;

	let districtList: dataType[] = [];
	districtList.push(data);

	// data.map((item: dataType) => {
	// 	if (Object.hasOwn(item, 'address') && item.address.dcDistrict == districtName) {
	// 		return districtList.push(item);
	// 	}
	// 	if (Object.hasOwn(item, 'district') && item.district == districtName) {
	// 		return districtList.push(item);
	// 	}
	// });
	return districtList;
}

export const mapReducer = mapSlice.reducer;
