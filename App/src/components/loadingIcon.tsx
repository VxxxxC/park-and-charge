import React from 'react';
import { View, Spinner, Text } from 'native-base';

function LoadingIcon() {
	return (
		<View
			style={{
				position: 'absolute',
				zIndex: 1,
				height: '100%',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<View
				width="50%"
				height="20%"
				borderRadius="3xl"
				bg="dark.50"
				opacity="70"
				display="flex"
				justifyContent="center"
			>
				<Spinner size="lg" />
				<Text textAlign="center" color="primary.500" fontSize="lg" fontWeight="bold">
					Loading
				</Text>
			</View>
		</View>
	);
}

export default LoadingIcon;
