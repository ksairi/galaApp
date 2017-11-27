import { StackNavigator } from 'react-navigation'
import { Init } from '../screens/Init'
import { SignIn } from '../screens/SignIn'
import { Screens } from '../config/settings'


export default StackNavigator({
  [Screens.Init]: {
    screen: Init
  },
  [Screens.SignIn]: {
    screen: SignIn
  }
})