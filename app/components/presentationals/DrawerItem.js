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

export default class DrawerItem  extends React.PureComponent{

  onPressDrawerItem = ()=>{
    this.props.onPress(this.props.screen)
  }

  render(){
    return(
      <TouchableOpacity style={[styles.drawerItem,  this.props.active ? styles.activeItem : null]} onPress={this.onPressDrawerItem}>
        <Icon name={this.props.icon} size={60} style={styles.drawerItemIcon}/>
        <Text style={[styles.drawerItemLabel,{marginTop:15}]}>{this.props.label}</Text>
        <Icon name={'arrow-navigation-white-right'} size={30} style={[styles.drawerItemIcon, {marginTop:10, flex:0.6}]}/>
      </TouchableOpacity>
    )
  }
}
