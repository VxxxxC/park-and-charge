import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Box, View, ScrollView, Center } from "native-base";
import { StatusBar } from "expo-status-bar";

function Head() {
    return (
        <>
            <StatusBar style="light"></StatusBar>
            <Box
                pt="10"
                height="80px"
                bg="dark.50"
                alignItems="center"
                justifyContent="center"
            >
            </Box>
        </>
    );
}

export default Head;
