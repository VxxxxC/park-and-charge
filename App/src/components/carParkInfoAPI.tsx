import CarParkVacancyAPI from './carParkVacancyAPI';
import Spacer from './spacer';
import { HStack, Image, Spinner, Text, View, VStack } from 'native-base';
import { useAppSelector } from './redux/hooks';
import { Animated, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';
import React, { useEffect } from 'react';
import CarParkMap from './carParkMap';

function CarParkInfoAPI() {
	const selector = useAppSelector((state) => state.district);

	const { width, height } = Dimensions.get('window');
	const cardHeight = height / 4;
	const cardWidth = width - 50;

	let animation = new Animated.Value(0);
	let dataIndex = 0;

	return (
		<>
			<CarParkMap />
			{selector.loading == 'is fulfilled' ? (
				<Animated.ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: animation } } }], {
						useNativeDriver: true,
					})}
					style={{
						position: 'absolute',
						bottom: 50,
						width: '100%',
					}}
				>
					{selector.districtData.map((item: any, index: number) => {
						dataIndex = index;
						console.log('dataIndex : ', dataIndex);
						return (
							<>
								<View
									onLayout={(event) => {
										const { x, y, height, width } = event.nativeEvent.layout;
										console.log('onLayout : ', { x, y, height, width });
									}}
									key={index}
									style={{
										zIndex: 1,
										height: cardHeight,
										width: cardWidth,
										opacity: 0.8,
										backgroundColor: 'white',
										borderRadius: 10,
										marginHorizontal: 5,
										paddingHorizontal: 15,
										paddingVertical: 15,
									}}
								>
									<Animated.ScrollView>
										<VStack space={5}>
											<HStack space={5}>
												{item?.renditionUrls?.carpark_photo ? (
													<Image
														source={{ uri: `${item?.renditionUrls?.carpark_photo}` }}
														borderRadius={10}
														size="xl"
														alt="image"
													/>
												) : null}

												<VStack space={5}>
													<Text color="dark.50" fontSize="md" fontWeight="bold">
														{' '}
														{item.name}{' '}
													</Text>
													<HStack>
														<Text color="dark.50" fontWeight="bold" fontSize="sm">
															地址：
														</Text>
														<Text
															color="dark.50"
															fontWeight="bold"
															fontSize="sm"
															style={{ flex: 1, flexWrap: 'wrap' }}
														>
															{item.displayAddress}
														</Text>
													</HStack>
													{item?.paymentMethods ? (
														<HStack>
															<Text color="dark.50" fontSize="lg" fontWeight="bold">
																付款方式：
															</Text>
															<Text color="amber.400" fontSize="lg" fontWeight="bold">
																{[item?.paymentMethods].join()}
															</Text>
														</HStack>
													) : (
														<HStack>
															<Text color="dark.50" fontSize="sm" fontWeight="bold">
																付款方式：
															</Text>
															<Text color="red.400" fontSize="sm" fontWeight="bold">
																資料沒有提供
															</Text>
														</HStack>
													)}
												</VStack>
											</HStack>

											<HStack>
												<CarParkVacancyAPI Id={item.park_Id} />
											</HStack>
										</VStack>
									</Animated.ScrollView>
								</View>
							</>
						);
					})}
				</Animated.ScrollView>
			) : (
				<View
					style={{
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<View style={{ marginBottom: '50%' }}>
						<Spinner size="lg" />
						<Text color="primary.500" fontSize="lg" fontWeight="bold">
							{' '}
							Loading{' '}
						</Text>
					</View>
				</View>
			)}
		</>
	);
}

export default CarParkInfoAPI;
