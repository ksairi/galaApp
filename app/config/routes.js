import React from 'react'
import { Alert, AsyncStorage } from 'react-native'
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
import { Screens, Labels, Keys } from '../config/settings'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'

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

const loginStackGetStateForAction = LoginStack.router.getStateForAction

LoginStack.router.getStateForAction = (action, state) => {

  if(state && action.type === Keys.replaceCurrentScreen){
    var routes = state.routes.slice(0, state.routes.length - 1)
    routes.push(action)
    return {
      ...state,
      routes,
      index: routes.length - 1,
    }
  }

  return loginStackGetStateForAction(action, state)
}

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
      title:"Notificaciones",
      drawerIcon:({ tintColor, focused }) => (
        <MIcons
          name={focused ? 'notifications-active' : 'notifications'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  [Screens.Contact]:{
    screen:Contact,
    navigationOptions:{
      title:"Contacto",
      drawerIcon:({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-contact' : 'ios-contact-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  }
})

const HomeDrawerNavigation = StackNavigator({
  DrawerStack: { screen: HomeDrawerStack }
  },{
      navigationOptions: ({navigation}) => {
        const isMenuClosed = (navigation.state.index === 0)
        return {
          headerStyle: {backgroundColor: styles.headerBackgroundColor},
          headerTitleStyle: {color:'white', alignSelf: 'center'},
          headerLeft: 
            <Ionicons.Button name={isMenuClosed ? "md-menu" : "md-close"} 
            style={{backgroundColor: styles.headerBackgroundColor}} size={30} onPress={()=>{
              if (isMenuClosed) {
                  navigation.navigate('DrawerOpen')
                }else {
                  navigation.navigate('DrawerClose')
                }
              }}
            />,
          headerRight:
            <MCIcons.Button
              name={'logout'}
              size={26}
              style={{backgroundColor: styles.headerBackgroundColor}}
              onPress={()=>
                Alert.alert(
                '',
                '¿Cerrar sesión?',
                [
                  {text: 'No', style: 'cancel'},
                  {text: 'Sí', onPress: () => {
                    AsyncStorage.multiRemove([Keys.userId, Keys.userData, Keys.timeTable])
                    .then(()=>{
                      navigation.navigate(Screens.SignIn)
                    })
                  }},
                ],
                { cancelable: true }
                )
              }
            />
        } 
      }
    }
)

const defaultHomeNavigationGetStateForAction = HomeDrawerNavigation.router.getStateForAction
HomeDrawerNavigation.router.getStateForAction = (action, state) => {
  console.log(12)
  console.log(action)
  console.log(state)
  return defaultHomeNavigationGetStateForAction(action, state)
  
}

const AppNavigator = StackNavigator({
  [Screens.LoginStack]: { screen: LoginStack },
  [Screens.HomeDrawerStack]: { screen: HomeDrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  //title: 'Main',
  initialRouteName: Screens.LoginStack
})

/*const defaultGetStateForAction = AppNavigator.router.getStateForAction

AppNavigator.router.getStateForAction = (action, state) => {
  
  if(state && state.routes[state.index].routes && action.type === NavigationActions.BACK){
    const stackNavigatorRoutes = state.routes[state.index].routes
        , currentIndex = state.routes[state.index].index
    
    if(stackNavigatorRoutes[currentIndex] && stackNavigatorRoutes[currentIndex].routes){
      const drawerRoutes = stackNavigatorRoutes[currentIndex].routes[currentIndex]
      if (drawerRoutes.routes[drawerRoutes.index].routeName == Labels.HOME){
        return null
      }
    }
  }

  if(state && action.type === 'ReplaceCurrentScreen'){
    console.log('ReplaceCurrentScreen')
    console.log(state.routes)
    var rootRoutes = state.routes
    var loginStack = state.routes[state.index].routes
    var newStackNavigatorRoutes = loginStack.slice(0, loginStack.length - 1)
    newStackNavigatorRoutes.push(action)
    rootRoutes[state.index].routes = newStackNavigatorRoutes
    console.log(rootRoutes)
    return {
      ...state,
      newStackNavigatorRoutes,
      //index: newStackNavigatorRoutes.length - 1,
    }
  }
  console.log(action)
  console.log(state)
  return defaultGetStateForAction(action, state)
}*/

export default AppNavigator


