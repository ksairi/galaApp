import { SwitchNavigator } from 'react-navigation'
import { Screens } from '/config/settings'
import CheckUserActivityScreen from '/screens/CheckUserActivity'
import WelcomeScreen from '/screens/Welcome'
import LoginStack from './login/LoginStack'
import HomeStack from './home/HomeStack'

export default SwitchNavigator({
  [Screens.CheckUserActivity]: { screen: CheckUserActivityScreen },
  [Screens.Welcome]: { screen: WelcomeScreen },
  [Screens.LoginStack]: { screen: LoginStack },
  [Screens.HomeStack]: { screen: HomeStack }
}, {
  // Default config for all screens
  headerMode: 'none',
  //title: 'Main',
  initialRouteName: Screens.CheckUserActivity
})