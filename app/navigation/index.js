import { createSwitchNavigator } from "react-navigation";
import { Screens } from "/config/settings";
import CheckUserActivityScreen from "/screens/CheckUserActivity";
import WelcomeScreen from "/screens/Welcome";
import LoginStack from "./login/LoginStack";
import HomeStack from "./home/HomeStack";

export default createSwitchNavigator(
	{
		[Screens.CheckUserActivity]: { screen: CheckUserActivityScreen },
		[Screens.Welcome]: { screen: WelcomeScreen },
		[Screens.LoginStack]: { screen: LoginStack },
		[Screens.HomeStack]: { screen: HomeStack }
	},
	{
		headerMode: "screen",
		initialRouteName: Screens.CheckUserActivity
	}
);
