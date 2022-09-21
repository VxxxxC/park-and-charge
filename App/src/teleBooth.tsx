import React, { useEffect, useMemo, useState } from "react";
import {
  Center,
  FlatList,
  ScrollView,
  Text,
  View,
  VStack,
  HStack,
} from "native-base";
import TeleBoothAPI from "./components/teleBoothAPI";
import { SafeAreaView } from "react-native-safe-area-context";

function TeleBooth() {
  const [data, getData] = useState([]);

  useMemo(async () => {
    let mounted = true;

    const api: any = await TeleBoothAPI();
    // console.log("this is imported teleBooth API data : ", api);
    if (mounted) {
      getData(api);
    }

    return () => {
      mounted = false;
    };
  }, []);

  //   console.log(data);

  return (
    <SafeAreaView>
      <VStack p="5" bg="cyan.500">
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <>
              <HStack>
                <Text fontWeight="bold">電話亭編號 : </Text>
                <Text>{item["KIOSK_ID"]}</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">營運公司 : </Text>
                <Text>{item["OPERATOR"]}</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">地區 : </Text>
                <Text>{item["REGION"]}</Text>
              </HStack>

              <HStack>
                <Text fontWeight="bold">地址 : </Text>
                <Text w="80%">
                  {item["DISTRICT"]} , {item["LOCALITY"]} , {item["STREET"]}
                </Text>
              </HStack>
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
          keyExtractor={(item) => item["KIOSK_ID"]}
        />
      </VStack>
    </SafeAreaView>
  );
}
export default TeleBooth;
