import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Screens } from '/config/settings'
import DrawerItem from '/components/presentationals/DrawerItem'
import Icon from '/helpers/ImageHelper'
import Logo from '/components/presentationals/Logo'
import { genericBackgroundColor } from '/components/styles'

const styles = {
  drawerItemsWrapper:{
    paddingTop:10,
    backgroundColor:genericBackgroundColor,
    alignItems:'flex-start',
    paddingLeft:10
  },
  headerIcon:{
    flex:1,
    fontSize:150
  }
}

export default ({ navigation, activeItemKey })=>{
  return(
    <ScrollView contentContainerStyle={styles.drawerItemsWrapper}>
      <TouchableOpacity style={{flex:1,flexDirection:'row'}} onPress={()=>navigation.navigate(Screens.Home)}>
        <Logo style={styles.headerIcon}/>
      </TouchableOpacity>
      <DrawerItem active={activeItemKey == 'Profile'} icon='user-icon' label='MI PERFIL' onPress={()=> navigation.navigate(Screens.Profile)} />
      <DrawerItem active={activeItemKey == 'Routines'} icon='routines' label='RUTINAS' onPress={()=> navigation.navigate(Screens.Routines)} />
      <DrawerItem active={activeItemKey == 'Classes'} icon='classes' label='CLASES' onPress={()=> navigation.navigate(Screens.Classes)} />
      <DrawerItem active={activeItemKey == 'Timetable'} icon='timetable' label='HORARIOS' onPress={()=> navigation.navigate(Screens.Timetable)} />
      <DrawerItem active={activeItemKey == 'Messages'} icon='timetable' label='MENSAJES' onPress={()=> navigation.navigate(Screens.Messages)} />
      <DrawerItem active={activeItemKey == 'Referrals'} icon='referrals' label='REFERIDOS' onPress={()=> navigation.navigate(Screens.Referrals)} />
    </ScrollView>
  )
}
