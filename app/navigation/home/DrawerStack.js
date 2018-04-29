import React from 'react'
import { DrawerNavigator  } from 'react-navigation'
import { Screens } from '/config/settings'
import Profile from '/screens/Profile'
import Timetable from '/screens/Timetable'
import Routines from '/screens/Routines'
import Messages from '/screens/Messages'
import Referrals from '/screens/Referrals'
import DrawerContentComponent from '/components/presentationals/DrawerContentComponent'


export default DrawerNavigator({
  [Screens.Profile]:{ screen:Profile },
  [Screens.Routines]:{ screen:Routines },
  [Screens.Classes]:{ screen:Timetable },
  [Screens.Timetable]:{ screen:Timetable },
  [Screens.Messages]:{ screen:Messages },
  [Screens.Referrals]:{ screen:Referrals },
  },
{
  contentComponent:(props) => <DrawerContentComponent {...props} />      
})