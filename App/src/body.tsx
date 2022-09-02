import React from "react";
import { StyleSheet } from "react-native";
import { Box, View, ScrollView, Center } from "native-base";

function Body() {
  return (
    <View
      flexGrow="1"
      bg="light.50"
      alignItems="center"
      justifyContent="center"
    >
      <Center>This is Body</Center>
    </View>
  );
}

export default Body;
