import React from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { RkButton } from 'react-native-ui-kitten'
import RootWrapper from '/components/containers/RootWrapper'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import { ActionsCreators } from '/redux/actions'
import { Screens } from '/config/settings'
import Icon from '/helpers/ImageHelper'
import GenericText from '/components/presentationals/GenericText'
import { activeSideMenuItemColor } from '/components/styles'
import Footer from '/components/presentationals/Footer'

const styles = {
  imageContainer:{
    flex:0.5
  },
  iconsContainer:{
    flex:1,
    flexDirection:'row'
  },
  promotionsContainer:{
    flex:1
  },
  footerContainer: {
    flex:1,
    flexDirection:'row'
  },

  iconWrapper:{
    flex:2,
    backgroundColor: activeSideMenuItemColor,
    alignItems:'center',
    padding:10,
    marginTop:10,
    marginRight:10
  },
  label:{
    fontSize:10,
    fontFamily:'brother-1816-bold'
  }
}

@connect(
  state => ({
    userData:state.userData,
    isUsingCache:state.isUsingCache,
    currentHomeDrawerOption:state.currentHomeDrawerOption
  })
)
export default class Profile extends React.Component {

  componentDidMount(){
    if(this.props.currentHomeDrawerOption != ''){
      this.props.navigation.navigate(this.props.currentHomeDrawerOption)
      this.props.dispatch(ActionsCreators.setCurrentHomeDrawerOption(''))
    }
  }
  render(){
    const iconsData = [{icon:'user-icon', label:'MI PERFIL', screen:Screens.Profile}, {icon:'routines', label:'RUTINAS', screen:Screens.Routines},
                      {icon:'classes', label:'MIS CLASES', screen:Screens.Classes}, {icon:'timetable',label:'HORARIOS', screen:Screens.Timetable},
                      {icon:'timetable', label:'MENSAJES', screen:Screens.Messages}, {icon:'referrals', label:'REFERIDOS', screen:Screens.Referrals}]
    return (
      <ScrollView style={{flexGrow:1}}>
        <RootWrapper>
          <CentredWrapper>
            <View style={styles.imageContainer}>
              <GenericText>imageContainer</GenericText>
            </View>
            <View style={styles.iconsContainer}>

              {iconsData.map((iconData, index)=>
                <TouchableOpacity key={index} onPress={()=>{this.props.navigation.navigate(iconData.screen)}}>
                  <View style={styles.iconWrapper}>
                    <Icon name={iconData.icon} style={{fontSize:40}} color='white'/>
                    <GenericText style={styles.label}>
                      {iconData.label}
                    </GenericText>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.promotionsContainer}>
              <GenericText> promos container</GenericText>
            </View>
            <View style={styles.footerContainer}>
                <Footer />
            </View>
          </CentredWrapper>
        </RootWrapper>
      </ScrollView>
    )
  }
}
