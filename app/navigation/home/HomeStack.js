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
