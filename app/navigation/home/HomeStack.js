import React from "react";
import { createStackNavigator } from "react-navigation";
import DrawerStack from "./DrawerStack";
import { Screens } from "/config/settings";
import Settings from "/screens/Settings";
import Header from "/components/containers/Header";

const SettingsNavigator = createStackNavigator(
	{
		[Screens.Settings]: { screen: Settings }
	},
	{
		navigationOptions: ({ navigation }) => ({
			header: (
				<Header
					navigation={navigation}
					title="CONFIGURACIÓN"
					backScreen={Screens.Profile}
				/>
			)
		})
	}
);

export default createStackNavigator(
	{
		DrawerStack: { screen: DrawerStack },
		[Screens.Settings]: { screen: SettingsNavigator }
	},
	{
		headerMode: "none"
	}
);
