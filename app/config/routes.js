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

const InitStack = StackNavigator({
  [Screens.Init]: {
    screen:Init
  }
})

const LoginStack = StackNavigator({
  
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
                      const resetAction = NavigationActions.reset({
                      index: 0,
                      actions: [
                        NavigationActions.navigate({routeName:Screens.LoginStack})
                      ],
                      key:null
                    })
                    navigation.dispatch(resetAction)
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

const AppNavigator = StackNavigator({
  [Screens.InitStack] : {screen:InitStack},
  [Screens.LoginStack]: { screen: LoginStack },
  [Screens.HomeDrawerStack]: { screen: HomeDrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  //title: 'Main',
  initialRouteName: Screens.InitStack
})

export default AppNavigator


