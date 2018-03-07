import { StackNavigator  } from 'react-navigation'
import { Screens } from '/config/settings'
import LoginStack from './login/LoginStack'
import HomeStack from './home/HomeStack'

export default StackNavigator({
  [Screens.LoginStack]: { screen: LoginStack },
  [Screens.HomeStack]: { screen: HomeStack }
}, {
  // Default config for all screens
  headerMode: 'none',
  //title: 'Main',
  initialRouteName: Screens.LoginStack
})