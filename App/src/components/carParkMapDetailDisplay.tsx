import React from 'react';
import { Center, View, Text, Box } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function CarParkMapDetailDisplay() {
	return (
		<SafeAreaView>
			<Box
				style={{
					margin: 10,
					padding: 15,
					borderColor: 'black',
					borderWidth: 2,
					borderRadius: 20,
					height: '50%',
					backgroundColor: 'white',
				}}
			>
				<Text>carParkMapDetailDisplaycarParkMapDetailDisplay</Text>
			</Box>
		</SafeAreaView>
	);
}

export default CarParkMapDetailDisplay;
