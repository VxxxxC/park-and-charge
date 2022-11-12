import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { Flex, Text, ScrollView, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
} from "react-native-table-component";
import CarParkChargeAPI from "./components/carParkChargeAPI";

function CarCharge() {
  const [data, getData] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 30,
      backgroundColor: "#fff",
    },
    head: { height: 140, backgroundColor: "#f1f8ff" },
    text: { fontSize: 8, margin: 6 },
  });

  const fetchData = useCallback(async () => {
    let mounted = true;

    const api: any = await CarParkChargeAPI();
    if (mounted) {
      getData(api);
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(()=>{
    fetchData()
  },[fetchData])

  let title = data.map((title: string) => Object.keys(title));
  let content = data.map((content: string) => Object.values(content));

  return (
    <SafeAreaView>
      <VStack width="95%" height="100%">
        <ScrollView style={styles.container}>
          <Text style={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
            來源：香港電燈
          </Text>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row data={title[0]} style={styles.head} textStyle={styles.text} />
            <Rows data={content} textStyle={styles.text} />
          </Table>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}

export default CarCharge;
