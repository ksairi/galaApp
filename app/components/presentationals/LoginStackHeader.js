import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Icon from '/helpers/ImageHelper'
import globalStyles from '/config/styles'


export default ({navigation}) =>{
   
  return(
    <View style={{flexDirection:'row', backgroundColor:globalStyles.headerBackgroundColor}}>
      <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
        <Icon name="timetable" size={80} color='white'/>
      </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Icon name="referrals" size={80} color='white'/>
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>

        </View>
    </View>
  )
}