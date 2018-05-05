import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from '/helpers/ImageHelper'
import globalStyles from '/config/styles'


function onMenuPress(isMenuClosed, navigation){

  isMenuClosed ? navigation.navigate('DrawerOpen') : navigation.navigate('DrawerClose')
}

export default ({navigation, homeHeader}) =>{
  
  var isMenuClosed
  
  if(homeHeader){
    isMenuClosed = (navigation.state.index === 0)  
  }

  return(
    <View style={{flexDirection:'row', backgroundColor:globalStyles.headerBackgroundColor, marginTop:Expo.Constants.statusBarHeight}}>
      <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
        { homeHeader ?
          <TouchableOpacity onPress={()=>onMenuPress(isMenuClosed, navigation)}>
            <Icon name={isMenuClosed ? 'classes' : "message-icon"} size={80} color='white'/>
          </TouchableOpacity>
          :  
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Icon name="timetable" size={80} color='white'/>
          </TouchableOpacity>
        }
      </View>
      
      <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
        <Icon name="referrals" size={80} color='white'/>
      </View>
      
      <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}/>
    </View>
  )
}