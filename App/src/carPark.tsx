import axios from "axios";
import { Box, Button, Icon, Text } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CarParkDistrict from "./components/carParkDistrict";
import CarParkInfoAPI from "./components/carParkInfoAPI";
import CarParkVacancyAPI from "./components/carParkVacancyAPI";
import Spacer from "./components/spacer";

console.log(`${process.env.REACT_NATIVE_APP_EXPRESS_API}`);

function apiRequest() {
  axios(`${process.env.REACT_NATIVE_APP_EXPRESS_API}/carParkInfo`, {
    method: "POST",
  })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error({ error });
    });
}

function CarPark() {
  return (
    <SafeAreaView>
      <Button bg="amber.400" onPress={apiRequest}>
        <Text color="darkBlue.500">Button</Text>
      </Button>
      <Box bg="dark.50">
        <CarParkDistrict />
        <Spacer />
        <CarParkInfoAPI />
      </Box>
    </SafeAreaView>
  );
}

export default CarPark;
