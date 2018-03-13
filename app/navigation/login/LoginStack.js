import { StackNavigator } from 'react-navigation'
import SignIn from '/screens/SignIn'
import SignUp from '/screens/SignUp'
import ResetPassword from '/screens//ResetPassword'
import { Screens, Labels } from '/config/settings'

export default StackNavigator({
  
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