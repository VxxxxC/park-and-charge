import axios from "axios";
import {
  Box,
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
import CarParkDistrict from "./components/carParkDistrict";
import CarParkInfoAPI from "./components/carParkInfoAPI";
import CarParkVacancyAPI from "./components/carParkVacancyAPI";
import Spacer from "./components/spacer";

function CarPark() {
  return (
    <SafeAreaView>
      <Box bg="dark.50">
        <CarParkDistrict />
        <Spacer />
        <CarParkInfoAPI />
      </Box>
    </SafeAreaView>
  );
}

export default CarPark;
