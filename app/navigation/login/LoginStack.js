import { StackNavigator } from 'react-navigation'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import ResetPassword from './views/ResetPassword'
import { Screens, Labels, Keys } from '/config/settings'

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