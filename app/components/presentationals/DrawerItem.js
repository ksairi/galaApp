import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import icomoonConfig from '/icomoonConfig.json'

const Icon = createIconSetFromIcoMoon(icomoonConfig)
const iconSize = 100
const styles = StyleSheet.create({
  drawerItem:{
    flex:1,
    flexDirection:'row'
  },
  activeItem:{
    backgroundColor:'#12194d'
  },
  drawerItemIcon:{
    color:'white',
    flex:1
  },
  drawerItemLabel:{
    marginTop:20,
    flex:1,
    color:'white'

  }
})

export default ({active, onPress, icon, label})=>
  <TouchableOpacity style={[styles.drawerItem, active ? styles.activeItem : null]} onPress={()=> onPress()}>
    <Icon name={icon} size={iconSize} style={styles.drawerItemIcon}/>
    <Text style={[styles.drawerItemLabel,{marginTop:25}]}>{label}</Text>
    <Icon name={'arrow-navigation'} size={iconSize} style={styles.drawerItemIcon}/>
  </TouchableOpacity>