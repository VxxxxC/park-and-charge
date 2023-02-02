import React, { useEffect, useReducer } from 'react';
import { Center, View, Text, Box } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function CarParkMapScrollUpContainer({ popout }: any) {
	const pop = popout;
	console.log(pop);

	const [hover, toggleHover] = useReducer((hover) => !hover, false);

	const styles = StyleSheet.create({
		legend: {
			width: '25%',
			height: '5%',
			borderWidth: 1,
			borderColor: 'black',
			borderRadius: 10,
			position: 'absolute',
			top: -10,
			left: '45%',
			fontWeight: 'bold',
			backgroundColor: '#FFFFFF',
		},
	});

	return (
		<Box
			style={{
				position: 'absolute',
				bottom: !pop ? -220 : 50,
				height: '30%',
				padding: 15,
				borderColor: 'black',
				borderWidth: 2,
				borderRadius: 20,
				backgroundColor: 'white',
			}}
			shadow="9"
		>
			<Box style={styles.legend} shadow="9" />
			<Text style={{ color: !pop ? 'red' : 'green' }}>
				carParkMapDetailDisplaycarParkMapDetailDisplay
			</Text>
		</Box>
	);
}

export default CarParkMapScrollUpContainer;
