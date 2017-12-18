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
import { Screens, Labels } from '../config/settings'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
    screen:Home,
    navigationOptions:{
      headerTitle:Labels.HOME,
      drawerIcon:({ tintColor, focused }) => (
        <MCIcons
          name={focused ? 'home-circle' : 'home'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  [Screens.TimeTable]:{
    screen:TimeTable,
    navigationOptions:{
      title:"Horarios",
      drawerIcon:({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-time' : 'ios-time-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  [Screens.Routines]:{
    screen:Routines,
    navigationOptions:{
      title:"Rutinas",
      drawerIcon:({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-book' : 'ios-book-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  [Screens.Notifications]:{
    screen:Notifications,
    navigationOptions:{
      title:"Notificaciones"
    }
  },
  [Screens.Contact]:{
    screen:Contact,
    navigationOptions:{
      title:"Contacto"
    }
  }
})

const HomeDrawerNavigation = StackNavigator({
  DrawerStack: { screen: HomeDrawerStack }
  },{
    navigationOptions: ({navigation}) => {
      const isMenuClosed = (navigation.state.index === 0)
      return {
      headerStyle: {backgroundColor: 'green'},
      headerTitleStyle: {color:'white'},
      headerLeft: 
      <Ionicons name={isMenuClosed ? "md-menu" : "md-close"} size={30} onPress={()=>{
        if (isMenuClosed) {
            navigation.navigate('DrawerOpen')
          }else {
            navigation.navigate('DrawerClose')
          }
        }}
      />
  }}}
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
      if (drawerRoutes.routes[drawerRoutes.index].routeName == Labels.HOME){
        return null
      }
    }
  }
  return defaultGetStateForAction(action, state)
}

export default AppNavigator


