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

export default class extends React.PureComponent{

  state = {
    drawerItems:[{name:'Profile', icon:'user-icon', label:'MI PERFIL', screen:Screens.Profile},
                {name:'Routines', icon:'routines', label:'RUTINAS', screen:Screens.Routines},
                {name:'Classes', icon:'classes', label:'MI PERFIL', screen:Screens.Classes},
                {name:'Timetable', icon:'timetable', label:'MI PERFIL', screen:Screens.Timetable},
                {name:'Messages', icon:'timetable', label:'MENSAJES', screen:Screens.Messages},
                {name:'Referrals', icon:'referrals', label:'REFERIDOS', screen:Screens.Referrals}
              ]
  }

  render(){
    return(
      <ScrollView contentContainerStyle={styles.drawerItemsWrapper}>
        <TouchableOpacity style={{flex:1,flexDirection:'row'}} onPress={()=>this.props.navigation.navigate(Screens.Home)}>
          <Logo style={styles.headerIcon}/>
        </TouchableOpacity>
        {
          this.state.drawerItems.map((drawerItem, index) =>
              <DrawerItem key={index} active={this.props.activeItemKey == drawerItem.name} icon={drawerItem.icon} label={drawerItem.label}
              onPress={()=>this.props.navigation.navigate(drawerItem.screen)} />
          )
        }
      </ScrollView>
    )
  }
}
