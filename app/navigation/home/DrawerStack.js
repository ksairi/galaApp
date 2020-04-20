import React from 'react'
import { Keyboard } from 'react-native'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import { Screens } from '/config/settings'
import Home from '/screens/Home'
import Profile from '/screens/Profile'
import Timetable from '/screens/Timetable'
import Routines from '/screens/Routines'
import RoutineDetail from '/screens/RoutineDetail'
import Messages from '/screens/Messages'
import Referrals from '/screens/Referrals'
import CameraView from '/screens/CameraView'
// import NewMember from '/screens/NewMember'
import LiveClass from '/screens/LiveClass'
import DrawerContentComponent from '/components/containers/DrawerContentComponent'
import Header from '/components/containers/Header'

const HomeNavigator = createStackNavigator(
{[Screens.Home]: { screen: Home }},
  {
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} isHomeHeader />
    })
  }
)

// const NewMemberNavigator = createStackNavigator({
//   [Screens.NewMember]: { screen: NewMember }
// },
//   {
//     navigationOptions: ({ navigation }) => ({
//       header: <Header navigation={navigation} isHomeHeader />
//     })
//   }
// )

const ProfileNavigator = createStackNavigator({
  [Screens.Profile]: { screen: Profile }
},
  {
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} isHomeHeader />
    })
  }
)

const RoutinesNavigator = createStackNavigator({
  [Screens.Routines]: { screen: Routines }
},
  {
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} isHomeHeader />
    })
  }
)

const RoutineDetailNavigator = createStackNavigator({
  [Screens.RoutineDetail]: { screen: RoutineDetail }
},
  {
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} isHomeHeader />
    })
  }
)

const TimetableNavigator = createStackNavigator({
  [Screens.Timetable]: { screen: Timetable }
},
  {
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} isHomeHeader />
    })
  }
)

const MessagesNavigator = createStackNavigator(
  {
    [Screens.Messages]: { screen: Messages }
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} isHomeHeader />
    })
  }
)

const ReferralsNavigator = createStackNavigator(
  {
    [Screens.Referrals]: { screen: Referrals }
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} isHomeHeader />
    })
  }
)

const drawerNavigator = createDrawerNavigator(
  {
    [Screens.Home]: { screen: HomeNavigator },
    // [Screens.LiveClass]: { screen: LiveClass },
    // [Screens.NewMember]: { screen: NewMemberNavigator },
    [Screens.Profile]: { screen: ProfileNavigator },
    [Screens.Routines]: { screen: RoutinesNavigator },
    [Screens.RoutineDetail]: { screen: RoutineDetailNavigator },
    [Screens.CameraView]: { screen: CameraView },
    [Screens.Classes]: { screen: TimetableNavigator },
    [Screens.Timetable]: { screen: TimetableNavigator },
    [Screens.Messages]: { screen: MessagesNavigator },
    [Screens.Referrals]: { screen: ReferralsNavigator }
  },
  {
    contentComponent: props => (
      <DrawerContentComponent
        navigation={props.navigation}
        activeItemKey={props.activeItemKey}
      />
    ),
    backBehavior: 'initialRoute'
  }
)

const defaultGetStateForAction = drawerNavigator.router.getStateForAction

drawerNavigator.router.getStateForAction = (action, state) => {
  if (state && action.type === 'Navigation/DRAWER_OPENED') {
    Keyboard.dismiss()
  }
  return defaultGetStateForAction(action, state)
}

export default drawerNavigator
