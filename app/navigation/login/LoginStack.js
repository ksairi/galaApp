import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import SignIn from "/screens/SignIn";
import SignUp from "/screens/SignUp";
import ResetPassword from "/screens//ResetPassword";
import { Screens } from "/config/settings";

export default createSwitchNavigator({
	[Screens.SignIn]: {
		screen: createStackNavigator({
			[Screens.SignIn]: { screen: SignIn }
		})
	},
	[Screens.SignUp]: {
		screen: createStackNavigator({
			[Screens.SignUp]: { screen: SignUp }
		})
	},
	[Screens.ResetPassword]: {
		screen: createStackNavigator({
			[Screens.ResetPassword]: { screen: ResetPassword }
		})
	}
});
