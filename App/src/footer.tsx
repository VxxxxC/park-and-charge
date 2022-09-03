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
        <VStack pt="3" height="100px" bg="dark.50">
            <HStack

                display="flex"
                flexDirection="row"
                justifyContent="space-evenly"
            >
                <Pressable
                    onPress={() => console.log("Home Pressed!")}
                    _pressed={{ bg: "white" }}
                    p="4"
                    rounded="3xl"
                    alignSelf="center"
                >
                    <Octicons name="home" size={34} color="white" />
                </Pressable>
                <Pressable
                    onPress={() => console.log("Info Pressed!")}
                    _pressed={{ bg: "white" }}
                    p="4"
                    rounded="3xl"
                    alignSelf="center"
                >
                    <Octicons name="info" size={34} color="white" />
                </Pressable>
            </HStack>
        </VStack>
    );
}

export default Footer;
