import React, { useEffect, useMemo, useState } from "react";
import { Center, FlatList, ScrollView, Text, View, VStack } from "native-base";
import getAPI from "./API";

function DataAPI() {
  const [data, getData] = useState([]);

  async function apiControl() {
    const getApi = useMemo(async () => {
      const api: any = await getAPI();
      //   console.log(api);
      getData(api);
    }, []);
  }
  //   console.log(data);
  apiControl();

  return (
    <VStack mt="5" p="5" w="300px" bg="cyan.500">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <>
            <Center>{item["KIOSK_ID"]}</Center>
            <Center>{item["DISTRICT"]}</Center>
            <Center>{item["LOCALITY"]}</Center>
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
  );
}
export default DataAPI;
