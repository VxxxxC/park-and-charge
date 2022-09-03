import React from "react";
import { SafeAreaView } from "react-native";
import {
    Text,
    Link,
    HStack,
    Center,
    Heading,
    Switch,
    useColorMode,
    NativeBaseProvider,
    extendTheme,
    VStack,
    Box,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";
import Body from "./src/body";
import SpaceLine from "./src/components/spacer";
import Footer from "./src/footer";
import Head from "./src/head";

// Define the config
const config = {
    useSystemColorMode: true,
    initialColorMode: "light",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
    interface ICustomTheme extends MyThemeType { }
}
export default function App() {
    return (
        <NativeBaseProvider>
            <Box flexGrow="1" justifyContent="center">
                <Head />
                <SpaceLine />
                <Body />
                <SpaceLine />
                <Footer />
            </Box>
        </NativeBaseProvider>
    );
}
