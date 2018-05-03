import React from 'react'
import { View } from 'react-native'
import Icon from '/helpers/ImageHelper'

export default ({style}) =>
  <View style={[{flex:1}, style]}>
    <Icon name="timetable" size={80} color='white'/> 
  </View>
