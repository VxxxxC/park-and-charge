import React from "react";
import { StyleSheet } from "react-native";
import { Box, View, ScrollView, Center } from "native-base";

function Head() {
  return (
    <View
      pt="10"
      height="100px"
      bg="primary.300"
      alignItems="center"
      justifyContent="center"
    >
      <Center>This is Head</Center>
    </View>
  );
}

export default Head;
