import SignIn from '../../screens/SignIn'
import SignUp from '../../screens/SignUp'
import ResetPassword from '../../screens/ResetPassword'
import { StackNavigator } from 'react-navigation'
import { Screens, Labels, Keys } from '../../config/settings'

const loginStack = StackNavigator({
  
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

export default loginStack