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
	//

	const fetchData = useCallback(
		(id: string) => {
			console.log('ID received : ', id);
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			axios(
				`https://api.data.gov.hk/v1/carpark-info-vacancy?data=vacancy&carparkIds=${id}&lang=zh_TW`,
				config
			).then((result) => {
				const info = result.data.results[0];
				const privateCarInfo = info.privateCar;
				const privateCarVacancy = privateCarInfo[0];

				//console.log(privateCarVacancy.vacancy);
				return privateCarVacancy.vacancy.toString();
			});
		},
		[selector.districtData]
	);

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
					showsUserLocation={true}
					followsUserLocation={true}
					showsMyLocationButton={true}
				>
					{selector.loading == 'is fulfilled'
						? selector.districtData.map((item: any) => (
								<Marker
									key={item.park_Id}
									title={`${item.name} 車位：${fetchData(item.park_Id)}`}
									description={`${item?.displayAddress}`}
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
