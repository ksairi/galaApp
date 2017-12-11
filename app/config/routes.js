import { StackNavigator, DrawerNavigator } from 'react-navigation'
import Init from '../screens/Init'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import ResetPassword from '../screens/ResetPassword'
import Home from '../screens/Home'
import TimeTable from '../screens/TimeTable'
import Routines from '../screens/Routines'
import Notifications from '../screens/Notifications'
import Contact from '../screens/Contact'
import { Screens } from '../config/settings'


const LoginStack = StackNavigator({
  [Screens.Init]: {
    screen:Init
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

const HomeDrawerNavigation = DrawerNavigator({
  [Screens.Home]:{
    screen:Home
  },
  [Screens.TimeTable]:{
    screen:TimeTable
  },
  [Screens.Routines]:{
    screen:Routines
  },
  [Screens.Notifications]:{
    screen:Notifications
  },
  [Screens.Contact]:{
    screen:Contact
  }

})

export default StackNavigator({
  [Screens.LoginStack]: { screen: LoginStack },
  [Screens.HomeDrawerStack]: { screen: HomeDrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  //title: 'Main',
  initialRouteName: Screens.LoginStack
})