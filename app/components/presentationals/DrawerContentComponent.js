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
    paddingLeft:5,
    paddingBottom:5,
    flexGrow:1
  },
  headerIcon:{
    flex:1,
    fontSize:40
  }
}

export default class DrawerContentComponent extends React.PureComponent{

  state = {
    drawerItems:[
      {icon:'user-icon', label:'MI PERFIL', screen:Screens.Profile, style:{icon:{marginTop:5, paddingLeft:7, fontSize:30}, label:{marginTop:5}, arrow:{marginTop:15}}},
      {icon:'routines', label:'RUTINAS', screen:Screens.Routines, style:{icon:{marginTop:3, fontSize:25}, arrow:{marginTop:10}}},
      {icon:'classes', label:'MIS CLASES', screen:Screens.Classes, style:{icon:{fontSize:40, paddingLeft:15}, label:{marginTop:5}, arrow:{marginTop:12}}},
      {icon:'timetable', label:'HORARIOS', screen:Screens.Timetable, style:{icon:{fontSize:37,paddingLeft:5}, label:{marginTop:7}, arrow:{marginTop:15}}},
      {icon:'referrals', label:'MENSAJES', screen:Screens.Messages, style:{arrow:{marginTop:10}}},
      {icon:'referrals', label:'REFERIDOS', screen:Screens.Referrals, style:{label:{marginTop:5}, arrow:{marginTop:13}}}
    ]
  }

  navigateTo = screen => {
    this.props.navigation.navigate(screen)
  }
  navigateToHome = screen => () => {
    this.props.navigation.navigate(screen)
  }

  render(){
    return(
      <ScrollView contentContainerStyle={styles.drawerItemsWrapper}>
        <TouchableOpacity style={{flex:1,flexDirection:'row', marginLeft:13}} onPress={this.navigateToHome(Screens.Home)}>
          <Logo style={styles.headerIcon}/>
        </TouchableOpacity>
        {
          this.state.drawerItems.map((drawerItem, index) =>
            <DrawerItem key={index} active={this.props.activeItemKey == drawerItem.screen} icon={drawerItem.icon} label={drawerItem.label}
              screen={drawerItem.screen} onPress={this.navigateTo} style={drawerItem.style} />
          )
        }
      </ScrollView>
    )
  }
}
