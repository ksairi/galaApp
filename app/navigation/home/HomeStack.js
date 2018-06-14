import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation";
import DrawerStack from "./DrawerStack";
import Header from "/components/containers/Header";

export default createStackNavigator(
	{
		DrawerStack: { screen: DrawerStack }
	},
	{
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} isHomeHeader />
		})
	}
);
