import { StackNavigator } from 'react-navigation'
import Init from '../screens/Init'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import ResetPassword from '../screens/ResetPassword'
import { Screens } from '../config/settings'


export default StackNavigator({
  [Screens.Init]: {
    screen: Init
  },
  [Screens.SignIn]: {
    screen: SignIn
  },
  [Screens.SignUp]: {
    screen: SignUp
  },
  [Screens.ResetPassword]: {
    screen: ResetPassword
  }
})