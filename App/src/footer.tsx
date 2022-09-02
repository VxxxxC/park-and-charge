import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  Box,
  View,
  ScrollView,
  Center,
  VStack,
  HStack,
  Pressable,
  Button,
} from "native-base";
import { Octicons } from "@expo/vector-icons";

function Footer() {
  return (
    <VStack pb="5" height="100px" bg="light.50">
      <HStack
        pt="5"
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
      >
        <Pressable
          onPress={() => console.log("Home Pressed!")}
          _hover={{ bg: "blueGray.300" }}
          bg="blueGray.600"
          py="2"
          px="3"
          rounded="sm"
          alignSelf="center"
        >
          <Octicons name="home" size={34} color="black" />
        </Pressable>
        <Octicons name="info" size={34} color="black" />
      </HStack>
    </VStack>
  );
}

export default Footer;
