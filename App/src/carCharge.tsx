import React from "react";
import { Flex, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons';

function CarCharge() {
  return (
    <SafeAreaView>
      <VStack bg="dark.50" width='100%' height='100%'>
        <Flex mt='50%' mx='20%' justify='center' align='center' height='20%' borderWidth='1' borderColor='dark.900' borderRadius='3xl'>
        <Text color='dark.900' fontSize="20px">Coming Soon...<FontAwesome name="gears" size={30} color="white" /></Text>
        </Flex>
      </VStack>
    </SafeAreaView>
  );
}

export default CarCharge;
