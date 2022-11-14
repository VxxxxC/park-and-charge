import React from 'react';
import { View, Spinner, Text } from 'native-base';

function LoadingIcon() {
	return (
		<View
			style={{
				zIndex: '1',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<View width="50%" height="20%" borderRadius="3xl" bg="dark.50" opacity="70">
				<Spinner size="lg" />
				<Text color="primary.500" fontSize="lg" fontWeight="bold">
					Loading
				</Text>
			</View>
		</View>
	);
}

export default LoadingIcon;
