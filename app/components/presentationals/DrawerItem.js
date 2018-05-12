import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import { activeSideMenuItemColor } from '/components/styles'
import Icon from '/helpers/ImageHelper'

const styles = {
  drawerItem:{
    flex:1,
    flexDirection:'row',
    marginTop:30
  },
  activeItem:{
    backgroundColor:activeSideMenuItemColor
  },
  drawerItemIcon:{
    color:'white',
    flex:1
  },
  drawerItemLabel:{
    marginTop:20,
    flex:2.5,
    color:'white',
    fontSize:20,
    fontFamily:'brother-1816-bold'

  }
}

export default ({active, onPress, icon, label})=>
  <TouchableOpacity style={[styles.drawerItem, active ? styles.activeItem : null]} onPress={()=> onPress()}>
    <Icon name={icon} size={60} style={styles.drawerItemIcon}/>
    <Text style={[styles.drawerItemLabel,{marginTop:15}]}>{label}</Text>
    <Icon name={'arrow-navigation-white-right'} size={30} style={[styles.drawerItemIcon, {marginTop:10, flex:0.6}]}/>
  </TouchableOpacity>
