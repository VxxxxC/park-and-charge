import { useState, useEffect, useCallback, useReducer } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import { Center, View, Text, Image, ZStack, Spinner, Box } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useAppDispatch } from './components/redux/hooks';
import { useAppSelector } from './components/redux/hooks';
import { fetchMap } from './components/redux/mapReducer';
import CarParkMapDetailDisplay from './components/carParkMapDetailDisplay';
import CarParkDistrict from './components/carParkDistrict';
import CarParkInfoAPI from './components/carParkInfoAPI';

function CarParkMap() {
	const [opened, toggle]: boolean = useReducer((opened: boolean) => !opened, false);

	const dispatch = useAppDispatch();
	const selector = useAppSelector((state) => state.map);

	const fetchData = useCallback(() => {
		dispatch(fetchMap());
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);
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
		<>
			<View style={styles.container}>
				<MapView
					style={styles.map}
					showsScale={true}
					showsCompass={true}
					//showsUserLocation={true}
					//followsUserLocation={true}
					//userLocationCalloutEnabled={true}
					showsMyLocationButton={true}
				>
					{selector.loading == 'is fulfilled'
						? data.map((item: any) => (
								<Marker
									key={item.park_Id}
									title={item.name}
									description={item?.displayAddress}
									onPress={toggle}
									coordinate={{ latitude: item.latitude, longitude: item.longitude }}
								>
									{/*}<Image
										source={item?.renditionUrls?.carpark_photo}
										style={{ height: 6, width: 6 }}
									/>*/}
								</Marker>
						  ))
						: null}
				</MapView>
				<CarParkDistrict />
				<CarParkInfoAPI />
				{/* <CarParkMapDetailDisplay popout={opened} /> */}
			</View>
		</>
	);
}

export default CarParkMap;
