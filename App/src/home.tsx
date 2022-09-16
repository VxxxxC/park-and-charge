import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Box, View, ScrollView, Center } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TeleBooth from "./teleBooth";
import CarPark from "./carPark";
import Main from "./main";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

function Home() {
  return (
    <Tabs.Navigator
      initialRouteName="Carpark"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5eead4",
        tabBarActiveBackgroundColor: "white",
      }}
    >
      <Tabs.Screen
        name="Explore"
        component={Main}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="explore" size={24} color="orange" />
          ),
        }}
      />
      <Tabs.Screen
        name="TeleBooth"
        component={TeleBooth}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="person-booth" size={24} color="orange" />
          ),
        }}
      />
      <Tabs.Screen
        name="Carpark"
        component={CarPark}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="parking" size={24} color="orange" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default Home;
