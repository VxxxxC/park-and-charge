import CarParkVacancyAPI from './carParkVacancyAPI';
import Spacer from './spacer';
import { Box, HStack, Image, ScrollView, Spinner, Text, View, VStack } from 'native-base';
import { useAppSelector } from './redux/hooks';
import { TouchableOpacity } from 'react-native';

function CarParkInfoAPI() {
  const selector = useAppSelector((state) => state.district);

  return (
    <>
      {/*}			<Text bg="cyan.900">
				{selector.loading == 'is rejected' ? (
					<Text color="red.500">Status : {selector.loading}</Text>
				) : selector.loading == 'is pending' ? (
					<Text color="amber.500">Status : {selector.loading}</Text>
				) : (
					<Text color="green.500">Status : {selector.loading}</Text>
				)}
			</Text> */}

      {selector.loading == 'is fulfilled' ? (
        <ScrollView
          horizontal
          style={{
            position: 'absolute',
            bottom: 50,
            width: '100%',
          }}
        >
          {selector.districtData.map((item: any) => (
            <>
              <TouchableOpacity
                key={item.park_Id}
                style={{
                  zIndex: 1,
                  height: 250,
                  opacity: 0.8,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginHorizontal: 5,
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                }}
              >
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
                      <Text color="dark.50" fontWeight="bold" fontSize="sm">
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
              </TouchableOpacity>
            </>
          ))}
        </ScrollView>
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
