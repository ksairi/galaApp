import React from 'react'
import { View } from 'react-native'
import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import icomoonConfig from '/icomoonConfig.json'


const Icon = createIconSetFromIcoMoon(icomoonConfig)

export default ({style}) =>
  <View style={[{flex:1}, style]}>
    <Icon name="timetable" size={80} color='white'/> 
  </View>
