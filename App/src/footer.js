import React from "react";
import { StyleSheet, Text } from "react-native";
import { Box, View, ScrollView, Center } from "native-base";

function Footer() {
  return (
    <View
      pb="5"
      height="100px"
      bg="primary.800"
      alignItems="center"
      justifyContent="center"
    >
      <Center>This is Footer</Center>
    </View>
  );
}

export default Footer;
