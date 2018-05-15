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
    drawerItems:[{icon:'user-icon', label:'MI PERFIL', screen:Screens.Profile},
      {icon:'routines', label:'RUTINAS', screen:Screens.Routines},
      {icon:'classes', label:'MIS CLASES', screen:Screens.Classes},
      {icon:'timetable', label:'HORARIOS', screen:Screens.Timetable},
      {icon:'timetable', label:'MENSAJES', screen:Screens.Messages},
      {icon:'referrals', label:'REFERIDOS', screen:Screens.Referrals}
    ]
  }

  navigateTo = (screen)=>{
    this.props.navigation.navigate(screen)
  }
  navigateToHome = (screenName)=>(e)=>{
    this.props.navigation.navigate(screenName)
  }

  render(){
    return(
      <ScrollView contentContainerStyle={styles.drawerItemsWrapper}>
        <TouchableOpacity style={{flex:1,flexDirection:'row'}} onPress={this.navigateToHome(Screens.Home)}>
          <Logo style={styles.headerIcon}/>
        </TouchableOpacity>
        {
          this.state.drawerItems.map((drawerItem, index) =>
            <DrawerItem key={index} active={this.props.activeItemKey == drawerItem.screen} icon={drawerItem.icon} label={drawerItem.label}
              screen={drawerItem.screen} onPress={this.navigateTo} />
          )
        }
      </ScrollView>
    )
  }
}
