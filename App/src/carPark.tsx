import axios from 'axios';
import { Box, Button, Icon, Text } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CarParkDistrict from './components/carParkDistrict';
import CarParkVacancyAPI from './components/carParkVacancyAPI';
import Spacer from './components/spacer';
import { Provider } from 'react-redux';
import { useAppSelector } from './components/redux/hooks';
import CarParkMap from './components/carParkMap';
import LoadingIcon from './components/loadingIcon';

console.log(`from carPark.tsx, express ENV : ${process.env.REACT_NATIVE_APP_EXPRESS_API}`);

function CarPark() {
	const selector = useAppSelector((state) => state.district);
	console.log(`loading : ${selector.loading}`);
	return (
		<Box bg="dark.50">
			<CarParkDistrict />
      <CarParkMap/>
			{selector.loading == 'is pending' ? <LoadingIcon /> : null}
		</Box>
	);
}

export default CarPark;
