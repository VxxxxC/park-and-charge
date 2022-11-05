import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Box, View, ScrollView, Center } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CarParkMap from "./carParkMap";
import CarPark from "./carPark";
import CarCharge from "./carCharge";
import { FontAwesome5 } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "./components/redux/store";

const Tabs = createBottomTabNavigator();

function Home() {
  return (
    <Provider store={store}>
    <Tabs.Navigator
      initialRouteName="CarPark"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5eead4",
        tabBarActiveBackgroundColor: "white",
      }}
    >
      <Tabs.Screen
        name="CarPark"
        component={CarPark}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="parking" size={24} color="orange" />
          ),
        }}
      />
      <Tabs.Screen
        name="CarCharge"
        component={CarCharge}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="car-battery" size={24} color="orange" />
          ),
        }}
      />
      <Tabs.Screen
        name="Map"
        component={CarParkMap}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="map" size={24} color="orange" />
          ),
        }}
      />
    </Tabs.Navigator>
    </Provider>
  );
}

export default Home;
