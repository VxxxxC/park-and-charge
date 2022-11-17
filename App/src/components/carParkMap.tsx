import { useState, useEffect, useCallback, useReducer } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import { Center, View, Text, Image, ZStack, Spinner, Box } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useAppDispatch } from './redux/hooks';
import { useAppSelector } from './redux/hooks';
import { fetchMap } from './redux/mapReducer';

function CarParkMap() {
	const [opened, toggle]: boolean = useReducer((opened: boolean) => !opened, false);

	const selector = useAppSelector((state) => state.district);

	//console.log('data : ', selector.mapData);
	//console.log('loading : ', selector.loading);

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
						? selector.districtData.map((item: any) => (
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
				{/* <CarParkMapDetailDisplay popout={opened} /> */}
			</View>
		</>
	);
}

export default CarParkMap;
