import React from 'react';
import { Image, Text, View } from 'native-base';

function Lazyloading() {
	return (
		<View>
			<Image source={require('./asset/crane.gif')} alt="LazyLoading" size="2xl" />
		</View>
	);
}

export default Lazyloading;
