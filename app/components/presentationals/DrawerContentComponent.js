import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Screens } from '/config/settings'
import DrawerItem from '/components/presentationals/DrawerItem'
import Icon from '/helpers/ImageHelper'

const styles = StyleSheet.create({
  drawerItemsWrapper:{
    paddingTop:10,
    backgroundColor:'#0b1143',
    alignItems:'center'
  },
  headerIcon:{
    flex:1,
    color:'white'
  }
})

export default ({ navigation, activeItemKey })=>{
  return(
    <ScrollView contentContainerStyle={styles.drawerItemsWrapper}>
      <Icon name={'referrals'} size={100} style={styles.headerIcon}/>
      <DrawerItem active={activeItemKey == 'Profile'} icon='user-icon' label='Perfil' onPress={()=> navigation.navigate(Screens.Profile)} />
      <DrawerItem active={activeItemKey == 'Routines'} icon='routines' label='Rutinas' onPress={()=> navigation.navigate(Screens.Routines)} />
      <DrawerItem active={activeItemKey == 'Classes'} icon='classes' label='Clases' onPress={()=> navigation.navigate(Screens.Classes)} />
      <DrawerItem active={activeItemKey == 'Timetable'} icon='timetable' label='Horarios' onPress={()=> navigation.navigate(Screens.Timetable)} />
      <DrawerItem active={activeItemKey == 'Messages'} icon='message-icon' label='Mensajes' onPress={()=> navigation.navigate(Screens.Messages)} />
      <DrawerItem active={activeItemKey == 'Referrals'} icon='referrals' label='Referidos' onPress={()=> navigation.navigate(Screens.Referrals)} />
    </ScrollView>
  )
}