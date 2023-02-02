import { useCallback, useReducer } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions, Animated } from 'react-native';
import { View, Box } from 'native-base';
import axios from 'axios';
import { useAppDispatch } from './redux/hooks';
import { useAppSelector } from './redux/hooks';

function CarParkMap() {
	const [opened, toggle]: boolean = useReducer((opened: boolean) => !opened, false);

	const selector = useAppSelector((state) => state.district);

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

				console.log(`This is vacancy number for drop-pin : ${privateCarVacancy.vacancy}`);
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
    		markerWrap: {
			alignItems: 'center',
			justifyContent: 'center',
		},
		marker: {
			width: 6,
			height: 6,
			borderRadius: 20,
			backgroundColor: 'rgba(130,4,150, 0.9)',
		},
		ring: {
			justifyContent: 'center',
			alignItems: 'center',
			width: 24,
			height: 24,
			borderRadius: 20,
			backgroundColor: 'rgba(130,4,150, 0.3)',
			position: 'absolute',
			borderWidth: 1,
			borderColor: 'rgba(130,4,150, 0.5)',
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
							coordinate={{ latitude: item.latitude, longitude: item.longitude }}
						>
							<Animated.View style={styles.markerWrap}>
								<Animated.View style={styles.ring}>
									<View style={styles.marker} />
								</Animated.View>
							</Animated.View>
						</Marker>
				  ))
				: null}

				</MapView>
			</View>
		</>
	);
}

export default CarParkMap;
