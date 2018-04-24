import { StackNavigator  } from 'react-navigation'
import { Screens } from '/config/settings'
import WelcomeStack from './welcome/WelcomeStack'
import LoginStack from './login/LoginStack'
import HomeStack from './home/HomeStack'

exports.FirstTimeRoutes = StackNavigator({
  [Screens.WelcomeStack]: { screen: WelcomeStack },
  [Screens.LoginStack]: { screen: LoginStack },
  [Screens.HomeStack]: { screen: HomeStack }
}, {
  // Default config for all screens
  headerMode: 'none',
  //title: 'Main',
  initialRouteName: Screens.WelcomeStack
})

exports.RegularUserRoutes = StackNavigator({
  [Screens.LoginStack]: { screen: LoginStack },
  [Screens.HomeStack]: { screen: HomeStack }
}, {
  // Default config for all screens
  headerMode: 'none',
  //title: 'Main',
  initialRouteName: Screens.LoginStack
})