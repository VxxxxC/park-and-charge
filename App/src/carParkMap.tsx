import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import { Center, View, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useAppDispatch } from './components/redux/hooks';
import { useAppSelector } from './components/redux/hooks';
import { fetchMap } from './components/redux/mapReducer';

function CarParkMap() {
	let mounted = false;
	const dispatch = useAppDispatch();
	const selector = useAppSelector((state) => state.map);
	// const infoAPI = `${process.env.REACT_NATIVE_APP_EXPRESS_API}/getCarParkInfo`;

	// const [data, setData]: any = useState([]);

	// useEffect(() => {
	// 	axios.post(infoAPI).then((list: any) => {
	// 		type dataType = typeof list.data.res;
	// 		const data: dataType = list.data.res;
	// 		setData(data);
	// 	});
	// }, []);

	// const useData = useEffect(
	// 	() =>
	// 		data.map((item: any, index: number) => (
	// 			<Marker key={index} coordinate={{ latitude: item.latitude, longitude: item.longitude }} />
	// 		)),
	// 	[data]
	// );

	// console.log(useData);

	const fetchData = useEffect(() => {
		dispatch(fetchMap());
	}, []);

	//console.log('data : ', selector.mapData);
	//console.log('loading : ', selector.loading);

	let data: any = selector.mapData[0];

	const styles = StyleSheet.create({
		container: {
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
		},
		map: {
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height,
		},
	});

	return (
		<Center>
			<View style={styles.container}>
				<MapView style={styles.map} showsUserLocation={true} followsUserLocation={true}>
					{selector.loading == 'is fulfilled'
						? data.map((item: any, index: number) => (
								<Marker
									key={index}
									description={item.name}
                  icon={item?.renditionUrls?.carpark_photo}
									onPress={(e) => console.log(e.nativeEvent)}
									coordinate={{ latitude: item.latitude, longitude: item.longitude }}
								/>
						  ))
						: null}
				</MapView>
			</View>
		</Center>
	);
}

export default CarParkMap;
