import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CarParkInfo } from './types';

const infoAPI = `${process.env.REACT_NATIVE_APP_EXPRESS_API}/getCarParkInfo`;
const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

interface districtState {
	districtData: CarParkInfo[];
	loading: 'is idle' | 'is pending' | 'is fulfilled' | 'is rejected';
}

const initialState: districtState = {
	districtData: [],
	loading: 'is idle',
};

export const fetchDistrict = createAsyncThunk('district/fetchDistrict', async (input: string) => {
	const data = await getMongodbData(input);
	//console.log({data})
	return data;
});

const districtSlice = createSlice({
	name: 'district',
	initialState,
	reducers: {
		/* selectDistrict: (state, action: PayloadAction<typeof initialState>) => {
     fetchDistrict(action.payload)
    const mongodb: any = getMongodbData(action.payload);
     mongodb.then((res:any)=>{state.push(res)})
     console.log('<<state on reducer>> : ', state) 
   } */
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDistrict.pending, (state, action) => {
			//console.log('this is pending : ',action)
			state.loading = 'is pending';
		});
		builder.addCase(fetchDistrict.fulfilled, (state, action) => {
			//console.log('this is fulfilled : ',action)
			state.districtData = action.payload;
			state.loading = 'is fulfilled';
		});
		builder.addCase(fetchDistrict.rejected, (state, action) => {
			//console.log('this is rejected : ',action)
			state.loading = 'is rejected';
		});
	},
});

export async function getMongodbData(districtName: string): Promise<CarParkInfo[]> {
	const response = await axios.post(infoAPI, {}, config);
	const data: CarParkInfo[] = response.data.res;

	if (districtName == '全部') {
		return data;
	}

	const districtList: CarParkInfo[] = [];
	data.forEach((item: CarParkInfo) => {
		if (item.address && item.address.dcDistrict == districtName) {
			districtList.push(item);
		} else if (item.district && item.district == districtName) {
			districtList.push(item);
		}
	});
	return districtList;
}

export const districtReducer = districtSlice.reducer;
