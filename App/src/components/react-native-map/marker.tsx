import { useCallback } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import { useAppSelector } from '../redux/hooks';

const MarkerComponent = () => {
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
		</>
	);
};

export default MarkerComponent;
