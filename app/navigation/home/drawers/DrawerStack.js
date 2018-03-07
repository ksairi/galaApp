import React from 'react'
import { ScrollView } from 'react-native'
import { DrawerNavigator, DrawerItems, SafeAreaView  } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcons from 'react-native-vector-icons/MaterialIcons'
import { Screens, Keys, Labels } from '/config/settings'
import Home from '../views/Home'
import Timetable from '../views/Timetable'
import Routines from '../views/Routines'
import Notifications from '../views/Notifications'
import Contact from '../views/Contact'
import NewMemberPromotions from '../views/NewMemberPromotions'
import DrawerContentComponent from './DrawerContentComponent'

export default DrawerNavigator({
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
  [Screens.Timetable]:{
    screen:Timetable,
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
  },
  [Screens.NewMemberPromotions]:{
    screen:NewMemberPromotions,
    navigationOptions:{
      title:"Promoción para Socio Nuevo",
      drawerIcon:({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-contact' : 'ios-contact-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  }
},
{
  contentComponent:DrawerContentComponent      
}
  
)