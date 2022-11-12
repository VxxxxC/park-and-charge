import CarParkVacancyAPI from './carParkVacancyAPI';
import Spacer from './spacer';
import { Center, HStack, Image, ScrollView, Text, View, VStack } from 'native-base';
import { useAppSelector } from './redux/hooks';

function CarParkInfoAPI() {
	const selector = useAppSelector((state) => state.district);

	return (
		<>
			<Text bg="cyan.900">
				{selector.loading == 'is rejected' ? (
					<Text color="red.500">Status : {selector.loading}</Text>
				) : selector.loading == 'is pending' ? (
					<Text color="amber.500">Status : {selector.loading}</Text>
				) : (
					<Text color="green.500">Status : {selector.loading}</Text>
				)}
			</Text>
			{selector.loading == 'is fulfilled' ? (
				<ScrollView>
					{selector.districtData.map((item: any, index: number) => (
						<>
							<VStack>
								<Text color="dark.900" fontSize="2xl" fontWeight="bold">
									{' '}
									{item.name}{' '}
								</Text>
								<HStack>
									<Text color="dark.900" fontWeight="bold" fontSize="md">
										地址：
									</Text>
									<Text color="dark.900" fontWeight="bold" fontSize="md">
										{item.displayAddress}
									</Text>
								</HStack>
								{item?.renditionUrls?.carpark_photo ? (
									<>
										<Text color="dark.900" fontWeight="bold" fontSize="md">
											位置圖片：
										</Text>
										<Image
											source={{ uri: `${item?.renditionUrls?.carpark_photo}` }}
											size="2xl"
											alt="Text"
										/>
									</>
								) : (
									<>
										<Text color="dark.900" fontWeight="bold" fontSize="sm">
											位置圖片：
										</Text>
										<Text color="red.400" fontWeight="bold" fontSize="sm">
											資料沒有提供
										</Text>
									</>
								)}

								{item?.paymentMethods ? (
									<HStack>
										<Text color="dark.900" fontSize="xl" fontWeight="bold">
											付款方式：
										</Text>
										<Text color="amber.400" fontSize="xl" fontWeight="bold">
											{[item?.paymentMethods].join()}
										</Text>
									</HStack>
								) : (
									<HStack>
										<Text color="dark.900" fontSize="sm" fontWeight="bold">
											付款方式：
										</Text>
										<Text color="red.400" fontSize="sm" fontWeight="bold">
											資料沒有提供
										</Text>
									</HStack>
								)}

								<HStack>
									<CarParkVacancyAPI Id={item.park_Id} />
								</HStack>
							</VStack>
							<Spacer />
						</>
					))}
				</ScrollView>
			) : (
				<Image source={require('./asset/crane.gif')} alt="lazy=Loading" />
			)}
		</>
	);
}

export default CarParkInfoAPI;
