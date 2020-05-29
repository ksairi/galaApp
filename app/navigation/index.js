import {createSwitchNavigator} from "react-navigation";
import {Screens} from "config/settings";
import CheckUserActivityScreen from "screens/CheckUserActivity";
import SuggestAppDownload from "screens/SuggestAppDownload";
import WelcomeScreen from "screens/Welcome";
import LoginStack from "./login/LoginStack";
import HomeStack from "./home/HomeStack";

export default createSwitchNavigator(
  {
    [Screens.SuggestAppDownload]: {screen: SuggestAppDownload},
    [Screens.CheckUserActivity]: {screen: CheckUserActivityScreen},
    [Screens.Welcome]: {screen: WelcomeScreen},
    [Screens.LoginStack]: {screen: LoginStack},
    [Screens.HomeStack]: {screen: HomeStack},
  },
  {
    headerMode: "screen",
    initialRouteName: Screens.SuggestAppDownload,
  }
);
