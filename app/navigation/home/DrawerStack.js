import React from 'react'
import { ScrollView } from 'react-native'
import { DrawerNavigator, DrawerItems, SafeAreaView  } from 'react-navigation'
import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import { Screens, Labels } from '/config/settings'
import Home from '/screens/Home'
import Timetable from '/screens/Timetable'
import Routines from '/screens/Routines'
import Notifications from '/screens/Notifications'
import Contact from '/screens/Contact'
import NewMemberPromotions from '/screens/NewMemberPromotions'
import DrawerContentComponent from '/components/containers/DrawerContentComponent'
import icomoonConfig from '/icomoonConfig.json'


const Icon = createIconSetFromIcoMoon(icomoonConfig)


export default DrawerNavigator({
  [Screens.Home]:{
    screen:Home,
    navigationOptions:{
      headerTitle:Labels.HOME,
      drawerIcon:({ tintColor, focused }) => (
        <Icon
          name={focused ? 'user-icon-white' : 'user-icon'}
          size={100}
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
        <Icon
          name={focused ? 'timetable' : 'timetable-white'}
          size={80}
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
        <Icon
          name={focused ? 'routines' : 'routines-white'}
          size={80}
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
        <Icon
          name={focused ? 'message-icon' : 'message-icon-white'}
          size={80}
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
        <Icon
          name={focused ? 'referrals' : 'referrals-white'}
          size={80}
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
        <Icon
          name={focused ? 'referrals' : 'referrals-white'}
          size={80}
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