import { useState, useEffect, useCallback, useReducer } from 'react';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import { Center, View, Text, Image, ZStack, Spinner, Box } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useAppDispatch } from './redux/hooks';
import { useAppSelector } from './redux/hooks';
import  CarParkMapDetailDisplay  from './carParkMapDetailDisplay';
import MarkerComponent from './react-native-map/marker';

function CarParkMap() {
	const [opened, toggle]: boolean = useReducer((opened: boolean) => !opened, false);

	const selector = useAppSelector((state) => state.district);

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
          <MarkerComponent/>
				</MapView>
        {/*<CarParkMapDetailDisplay popout={opened} />*/}
			</View>
		</>
	);
}

export default CarParkMap;
