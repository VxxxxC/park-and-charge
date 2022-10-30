import axios from "axios";
import { Box, Button, Icon, Text } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CarParkDistrict from "./components/carParkDistrict";
import CarParkInfoAPI from "./components/carParkInfoAPI";
import CarParkVacancyAPI from "./components/carParkVacancyAPI";
import Spacer from "./components/spacer";
import { Provider } from 'react-redux';
import { store } from './components/redux/store';


console.log(`from carPark.tsx, express ENV : ${process.env.REACT_NATIVE_APP_EXPRESS_API}`);

function CarPark() {
  return (
    <SafeAreaView>
      <Provider store={store}>
        <Box bg="dark.50">
          <CarParkDistrict />
        </Box>
      </Provider>
    </SafeAreaView>
  );
}

export default CarPark;
