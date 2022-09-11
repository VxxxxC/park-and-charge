import { Center, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function CarPark() {
  return (
    <SafeAreaView>
      <TouchableOpacity>
        <Center>
          <Text fontSize="36px">CarPark Intomation</Text>
        </Center>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default CarPark;
