import React from "react";
import { SafeAreaView } from "react-native";
import {
    NativeBaseProvider,
    extendTheme,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/home";

const RootStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

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
            <NavigationContainer>
                <RootStack.Navigator>
                    <RootStack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
