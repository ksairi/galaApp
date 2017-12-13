import React from 'react'
import { Button } from 'react-native'
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
//import Hamburger from 'react-native-hamburger'

export default class Routes extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      isHamburgerActive:false
    }
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this)
  }

  onNavigationStateChange(prevState, newState, action) {

    if (newState && action.type === 'Navigation/NAVIGATE' && action.routeName === 'DrawerClose') {
      //this.props.navigation.setParams({isHamburgerActive: false})
    }

    if (newState && action.type === 'Navigation/NAVIGATE' && action.routeName === 'DrawerOpen') {
      //this.props.navigation.setParams({isHamburgerActive: true})
    }
  }

  render() {
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
      navigationOptions: ({navigation}) => {
            
        return {
          headerStyle: {backgroundColor: 'green'},
          headerLeft: 
          //<Hamburger active={pIsHamburgerActive} 
          //type="spinCross" onPress={()=> {
          <Button
        title='Menu'
        onPress={() =>{
              if (navigation.state.index === 0) {
                console.log("DrawerOpen")
                navigation.navigate('DrawerOpen')
              }else {
                console.log("DrawerClose")
                navigation.navigate('DrawerClose')
                
              }
              
            }}
          />
        }
      }
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

  return <AppNavigator onNavigationStateChange={this.onNavigationStateChange}/>


  }
}
