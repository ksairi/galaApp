import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Icon from '/helpers/ImageHelper'
import globalStyles from '/config/styles'


function onMenuPress(isMenuClosed, navigation){

  isMenuClosed ? navigation.navigate('DrawerOpen') : navigation.navigate('DrawerClose')
}

export default ({navigation}) =>{

 const isMenuClosed = (navigation.state.index === 0)  
  return(
    <View style={{flexDirection:'row', backgroundColor:globalStyles.headerBackgroundColor}}>
      <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start',}}>
        <Ionicons.Button name={isMenuClosed ? "md-menu" : "md-close"} 
             size={30} onPress={()=>onMenuPress(isMenuClosed, navigation)} />
      </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Icon name="referrals" size={80} color='white'/>
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>

        </View>
    </View>
  )
}