import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Box, View, ScrollView, Center } from "native-base";
import DataAPI from "./components/dataAPI";

function Body() {
    return (
        <SafeAreaView>
            <Box
                h="4/5"
                flexGrow="1"
                bg="light.50"
                alignItems="center"
                justifyContent="center">
                <DataAPI />
            </Box>
        </SafeAreaView>

    );
}

export default Body;
