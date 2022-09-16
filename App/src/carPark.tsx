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
import React, { useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CarParkInfoAPI from "./components/carParkInfoAPI";
import CarParkVacancyAPI from "./components/carParkVacancyAPI";

function CarPark() {
  const [data, getData] = useState([]);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (!pause) {
      const api: any = CarParkInfoAPI();
      api.then((res: any) => {
        // console.log("this is imported carPark Info API data : ", res);
        getData(res);
        setPause(true);
      });
    }
  }, []);

  //console.log(data);

  return (
    <SafeAreaView>
      <VStack bg="dark.50">
        <FlatList
          data={data}
          renderItem={({ item }: any) => (
            <>
              <HStack p="3">
                <Text color="dark.900" fontWeight="bold" fontSize="xl">
                  {item["name"]}
                </Text>
              </HStack>

              {/* FIXME: for developer use only */}
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
                  <Text color="dark.900" fontSize="4xl">
                    {[item["paymentMethods"]].join()}
                  </Text>
                </VStack>
              ) : null}

              <HStack p="3">
                <Text>
                  <CarParkVacancyAPI Id={item["park_Id"]} />
                </Text>
              </HStack>

              <VStack p="3">
                <Text color="dark.900" fontWeight="bold" fontSize="lg">
                  地址 :{" "}
                </Text>
                <Text color="dark.900" fontSize="lg">
                  {item["district"]}, {item["displayAddress"]}
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

              <View
                style={{
                  height: 2,
                  backgroundColor: "white",
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
