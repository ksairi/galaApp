import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation";
import DrawerStack from "./DrawerStack";

export default createStackNavigator(
	{
		DrawerStack: { screen: DrawerStack }
	},
	{
		headerMode: "none"
	}
);
