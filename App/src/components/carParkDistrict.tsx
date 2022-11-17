import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { View } from 'native-base';
import Spacer from './spacer';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAppDispatch } from './redux/hooks';
import { fetchDistrict } from './redux/districtReducer';
import CarParkInfoAPI from './carParkInfoAPI';

function CarParkDistrict() {
	type itemType = {
		label: string;
		value: string;
	};

	const dispatch = useAppDispatch();

	const districtList: string[] = [];

	const infoAPI = `${process.env.REACT_NATIVE_APP_EXPRESS_API}/getCarParkInfo`;

	const [data, getData] = useState([]);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	const [items, setItems] = useState<itemType[]>([]);

	const fetchData = useCallback(() => {
		axios
			.post(infoAPI)
			.then((response) => {
				// console.log(response.data.res);
				getData(response.data.res);
			})
			.catch((error) => {
				console.error(error.response.headers);
				console.error(error.response.status);
				console.error(error.response.data);
			});
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const dropdownList = useCallback(() => {
		data.map((item: any) => {
			if (!districtList.includes(item.district) && item.district !== undefined) {
				districtList.push(item.district);
			}
			if (
				!districtList.includes(item?.address?.dcDistrict) &&
				!item.district &&
				item?.address?.dcDistrict
			) {
				districtList.push(item?.address?.dcDistrict);
			}
		});

		// below is mapping the districtList data to create dropdown menu
		let listItem: itemType[] = districtList.map<itemType>((res: any) => ({
			label: res,
			value: res,
		}));
		listItem.unshift({ label: '全部', value: '全部' });
		setItems(listItem);
	}, [data]);

	useEffect(() => {
		dropdownList();
	}, [dropdownList]);

	// below is dispatching selected district data to redux reducer
	useEffect(() => {
		dispatch(fetchDistrict(value));
	}, [value]);

	return (
		<>
			<View style={{ zIndex:1, position: 'absolute', top: 50, width: 200, marginHorizontal: 10 }}>
				<DropDownPicker
					placeholder={'選擇區域'}
					style={{
						backgroundColor: 'white',
					}}
					textStyle={{
						fontSize: 25,
					}}
					labelStyle={{ fontWeight: 'bold' }}
					open={open}
					value={value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
				/>
			</View>
			{/*}			<Spacer />
      <CarParkInfoAPI/> */}
		</>
	);
}

export default CarParkDistrict;
