import { createSlice, PayloadAction, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const infoAPI = `${process.env.REACT_NATIVE_APP_EXPRESS_API}/getCarParkInfo`

interface districtState {
  districtData: string[],
  loading: 'is idle' | 'is pending' | 'is fulfilled' | 'is rejected',
}

const initialState: districtState = {
  districtData: [],
  loading: 'is idle',
};

export const fetchDistrict = createAsyncThunk('district/fetchDistrict', async (input: string) => {
  const data = await getMongodbData(input);
  //console.log({data})
  return data;
})

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
      state.loading = 'is pending'
    });
    builder.addCase(fetchDistrict.fulfilled, (state, action) => {
      //console.log('this is fulfilled : ',action)
      state.districtData = action.payload
      state.loading = 'is fulfilled'
    });
    builder.addCase(fetchDistrict.rejected, (state, action) => {
      //console.log('this is rejected : ',action)
      state.loading = 'is rejected'
    })
  },
})


export async function getMongodbData(districtName: string) {
  const response: any = await axios.post(infoAPI)
  type dataType = typeof response.data.res;
  const data: dataType = response.data.res;

  let districtList: dataType[] = [];

  data.map((item: dataType) => {
    if (Object.hasOwn(item, "address") && item.address.dcDistrict == districtName) {
      return districtList.push(item);
    }
    if (Object.hasOwn(item, "district") && item.district == districtName) {
      return districtList.push(item);
    }
  });
  return districtList;
}

export const districtReducer = districtSlice.reducer

