import React from 'react'
import { HeaderButton } from '../components/Button'
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation'
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

const HomeDrawerStack = DrawerNavigator({
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

const HomeDrawerNavigation = StackNavigator({
  DrawerStack: { screen: HomeDrawerStack }
  },{
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'green'},
      headerLeft: 
      <HeaderButton
        title={navigation.state.index === 0 ? 'Menu':'<='} 
        onPress={() =>{
          if (navigation.state.index === 0) {
            navigation.navigate('DrawerOpen')
          }else {
            navigation.navigate('DrawerClose')
          }
        }}
      />
    })
  }
)

const AppNavigator = StackNavigator({
  [Screens.LoginStack]: { screen: LoginStack },
  [Screens.HomeDrawerStack]: { screen: HomeDrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  //title: 'Main',
  initialRouteName: Screens.LoginStack
})

const defaultGetStateForAction = AppNavigator.router.getStateForAction

AppNavigator.router.getStateForAction = (action, state) => {

  if(state && state.routes[state.index].routes && action.type === NavigationActions.BACK){
    const stackNavigatorRoutes = state.routes[state.index].routes
    const currentIndex = state.routes[state.index].index
    
    if(stackNavigatorRoutes[currentIndex].routes){
      const drawerRoutes = stackNavigatorRoutes[currentIndex].routes[currentIndex]
      if (drawerRoutes.routes[drawerRoutes.index].routeName == "Home"){
        return null
      }
    }
  }
  return defaultGetStateForAction(action, state)
}

export default AppNavigator


