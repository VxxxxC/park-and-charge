import CarParkVacancyAPI from './carParkVacancyAPI';
import Spacer from './spacer';
import { HStack, Image, Spinner, Text, View, VStack } from 'native-base';
import { useAppSelector } from './redux/hooks';
import { useAppDispatch } from './redux/hooks';
import { StyleSheet, Animated, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useCallback, useEffect, useReducer } from 'react';
import axios from 'axios';

function CarParkMap() {
	const selector = useAppSelector((state) => state.district);

	const { width, height } = Dimensions.get('window');
	const cardHeight = height / 4;
	const cardWidth = width - 50;
	//console.log({ cardheight: cardHeight, cardwidth: cardWidth });

	// interpolations , define the scrolling card to matching corresponding map marker
	let animation = new Animated.Value(0);
	const interpolations = selector.districtData.map((item: any, index: number) => {
		const inputRange = [(index - 1) * cardWidth, index * cardWidth, (index + 1) * cardWidth];

		const scale = animation.interpolate({
			inputRange,
			outputRange: [1, 2.5, 1],
			extrapolate: 'clamp',
		});
		const opacity = animation.interpolate({
			inputRange,
			outputRange: [0.35, 1, 0.35],
			extrapolate: 'clamp',
		});
		console.log({ scale, opacity });
		return { scale, opacity };
	});

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

				console.log(
					`This is vacancy number for drop-pin : ${privateCarVacancy.vacancy.toString()}`
				);
				return privateCarVacancy.vacancy.toString();
			});
		},
		[selector.districtData]
	);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
					{selector.districtData.map((item: any, index: number) => {
						const scaleStyle = {
							transform: [{ scale: interpolations[index].scale }],
						};
						const opacityStyle = {
							opacity: interpolations[index].opacity,
						};

						return (
							<Marker
								key={index}
								title={item.name}
								description={`${fetchData(item.park_Id)}`}
								coordinate={{ latitude: item.latitude, longitude: item.longitude }}
							>
								<Animated.View style={[styles.markerWrap, opacityStyle]}>
									<Animated.View style={[styles.ring, scaleStyle]}>
										<View style={styles.marker} />
									</Animated.View>
								</Animated.View>
							</Marker>
						);
					})}
				</MapView>

				{selector.loading == 'is fulfilled' ? (
					<Animated.ScrollView
						horizontal
						scrollEventThrottle={1}
						snapToInterval={cardWidth}
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
							return (
								<>
									<View
										key={index}
										style={{
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
			</View>
		</>
	);
}

export default CarParkMap;
