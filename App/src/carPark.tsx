import axios from "axios";
import {
  Center,
  FlatList,
  HStack,
  Image,
  Text,
  View,
  VStack,
} from "native-base";
import React, { useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import carParkInfoAPI from "./components/carParkInfoAPI";
import CarParkInfoAPI from "./components/carParkInfoAPI";

function CarPark() {
  const [data, getData] = useState([]);

  useMemo(async () => {
    const api: any = await carParkInfoAPI();
    // console.log("this is imported carPark Info API data : ", api);
    getData(api);
  }, []);

  async function vacancyInfo(carparkID: string | number) {
    let vacancyInfo = "";
    const result = await axios(
      `https://api.data.gov.hk/v1/carpark-info-vacancy?data=vacancy&carparkIds=${carparkID}&lang=zh_TW`
    );

    const info = result.data.results[0];
    const privateCarInfo = info.privateCar;
    const privateCarVacancy = privateCarInfo[0];
    vacancyInfo = `更新時間 :  ${privateCarVacancy.lastupdate}
      剩餘車位 :  ${privateCarVacancy.vacancy}
    `;

    return vacancyInfo;
  }
  // vacancyInfo(30).then((res) => {
  //   console.log(res);
  // });
  // console.log(data);

  return (
    <SafeAreaView>
      <VStack p="5" bg="cyan.500">
        <FlatList
          data={data}
          renderItem={({ item }: any) => (
            <>
              <HStack>
                <Text fontWeight="bold" fontSize="xl">
                  {item["name"]}
                </Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold" fontSize="lg">
                  停車場編號 :{" "}
                </Text>
                <Text fontSize="lg">{item["park_Id"]}</Text>
              </HStack>

              {item["paymentMethods"] ? (
                <HStack>
                  <Text fontWeight="bold" fontSize="lg">
                    付款方式 :{" "}
                  </Text>
                  <Text fontSize="lg">{[item["paymentMethods"]].join()}</Text>
                </HStack>
              ) : null}

              <HStack>
                <Text fontWeight="bold" fontSize="lg">
                  車位情況 :{" "}
                </Text>
                {vacancyInfo(item["park_Id"]).then((response: string) =>
                  console.log(response)
                )}
              </HStack>

              <HStack>
                <Text fontWeight="bold" fontSize="lg">
                  地址 :{" "}
                </Text>
                <Text fontSize="lg">
                  {item["district"]}, {item["displayAddress"]}
                </Text>
              </HStack>

              {item["renditionUrls"] ? (
                <HStack>
                  <Image
                    source={{
                      uri: `${item["renditionUrls"]["carpark_photo"]}`,
                    }}
                    size="2xl"
                    alt="Text"
                  />
                </HStack>
              ) : null}

              <View
                style={{
                  margin: 5,
                  flex: 1,
                  height: 1,
                  backgroundColor: "black",
                }}
              />
            </>
          )}
          keyExtractor={(item) => item["park_Id"]}
        />
      </VStack>
    </SafeAreaView>
  );
}

export default CarPark;
