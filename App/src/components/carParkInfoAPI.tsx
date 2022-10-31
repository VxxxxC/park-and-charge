import axios from "axios";
import Papa from "papaparse";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CarParkVacancyAPI from "./carParkVacancyAPI";
import Spacer from "./spacer";
import {
  Center,
  FlatList,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { useAppSelector } from './redux/hooks'

function CarParkInfoAPI({ carParkDistrict }: any) {

  const [data, getData]: any = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadDistrict, setLoadDistrict] = useState<boolean>(false);
  const [districtData, setDistrictData]: any = useState([]);

  const district: string = carParkDistrict;
  const selector = useAppSelector(state => state.district)

  /* useEffect(() => {
     let mounted = true;
     axios
       .get(`${process.env.REACT_NATIVE_APP_EXPRESS_API}/getCarParkInfo`)
       .then((response) => {
         if (mounted) {
           //console.log(response.data.res);
           getData(response.data.res);
           setLoading(false);
         }
         return;
       })
       .catch((error) => {
         console.error(error.response.headers);
         console.error(error.response.status);
         console.error(error.response.data);
       });
 
     return () => {
       mounted = false;
     };
   }, []); */
  // console.log(data);

  /* useEffect(() => {
   
     if (!loadDistrict) {
       data.map(async (item: any) => {
         if (item["district"] == district) {
           setDistrictData([...districtData, item])
         }
       })
       setLoadDistrict(true)
     }
 
 
     if (loadDistrict) {
       setLoadDistrict(false);
       data.map(async (item: any) => {
         if (item["district"] == district) {
           setDistrictData([...districtData, item])
         }
       })
       setLoadDistrict(true)
     }
 
 
     return () => {
       district = '';
       setDistrictData([]);
     }
   }, [carParkDistrict]) */

  useEffect(() => {
    //console.log('this is selector on carParkInfoAPI : ', selector.districtData[0].displayAddress)
  }, [selector])

  return (
    <>
      <Text bg='cyan.900'>{selector.loading == 'is pending' ? <Text color="red.500">Status : {selector?.loading}</Text> : <Text color="green.500">Status : {selector?.loading}</Text>}</Text>
      <ScrollView>
        {selector.districtData.map((item: any) => (
          <>
            <VStack key={item.park_Id}>
              <Text color='dark.900' fontSize='2xl' fontWeight='bold'> {item.name} </Text>
              <HStack>
                <Text color='dark.900' fontWeight='bold' fontSize='md'>地址：</Text>
                <Text color='dark.900' fontWeight='bold' fontSize='md'>{item.displayAddress}</Text>
              </HStack>
              {item?.renditionUrls?.carpark_photo ?
                <>
                  <Text color='dark.900' fontWeight='bold' fontSize='md'>位置圖片：</Text>
                  <Image source={{ uri: `${item?.renditionUrls?.carpark_photo}`, }} size="2xl" alt="Text" />
                </> :
                <>
                  <Text color='dark.900' fontWeight='bold' fontSize='sm'>位置圖片：</Text>
                  <Text color='red.400' fontWeight='bold' fontSize='sm'>資料沒有提供</Text>
                </>
              }

              {item?.paymentMethods ?
                <HStack>
                  <Text color='dark.900' fontSize='xl' fontWeight='bold'>付款方式：</Text>
                  <Text color='amber.400' fontSize='xl' fontWeight='bold'>{[item?.paymentMethods].join()}</Text>
                </HStack>
                :
                <HStack>
                  <Text color='dark.900' fontSize='sm' fontWeight='bold'>付款方式：</Text>
                  <Text color='red.400' fontSize='sm' fontWeight='bold'>資料沒有提供</Text>
                </HStack>
              }

              <HStack>
                <CarParkVacancyAPI Id={item.park_Id} />
              </HStack>
            </VStack>
            <Spacer />
          </>
        ))}
      </ScrollView>

      {/*
        <VStack>
            {selector.districtData.map((item:any) => (

              <>
                  <HStack p="3">
                  <Text color="dark.900" fontWeight="bold" fontSize="xl">
                    {item["name"]}
                  </Text>
                </HStack>
 
                <HStack p="3">
                  <Text color="dark.900" fontWeight="bold" fontSize="lg">
                    停車場編號 :{" "}
                  </Text>
                  <Text color="dark.900" fontSize="lg">
                    {item["park_Id"]}
                  </Text>
                </HStack> 

                {item["paymentMethods"] ? (
                  <VStack p="3">
                    <Text color="dark.900" fontWeight="bold" fontSize="lg">
                      付款方式 :{" "}
                    </Text>
                    <Text color="amber.400" fontSize="2xl" fontWeight="bold">
                      {[item["paymentMethods"]].join()}
                    </Text>
                  </VStack>
                ) : null}

                <VStack mt="10" p="3">
                  <CarParkVacancyAPI Id={item["park_Id"]} />
                </VStack>

                <VStack p="3">
                  <Text color="dark.900" fontWeight="bold" fontSize="lg">
                    地址 :{" "}
                  </Text>
                  <Text color="dark.900" fontSize="lg">
                    {item["displayAddress"]}
                  </Text>
                </VStack>

                {item["renditionUrls"] ? (
                  <HStack p="3">
                    <Image
                      source={{
                        uri: `${item["renditionUrls"]["carpark_photo"]}`,
                      }}
                      size="2xl"
                      alt="Text"
                    />
                  </HStack>
                ) : null}
                <Spacer /> 
              </>
            ))}
        </VStack>
        */}
    </>
  )
}

export default CarParkInfoAPI;
