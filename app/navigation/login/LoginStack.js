import { StackNavigator } from 'react-navigation'
import Initial from '/screens/Initial'
import SignIn from '/screens/SignIn'
import SignUp from '/screens/SignUp'
import ResetPassword from '/screens//ResetPassword'
import { Screens, Labels } from '/config/settings'

export default StackNavigator({
  [Screens.Initial]:{
    screen:Initial
  },
  [Screens.SignIn]:{
    screen:SignIn
  },
  [Screens.SignUp]:{
    screen:SignUp
  },
  [Screens.ResetPassword]:{
    screen:ResetPassword
  }
})