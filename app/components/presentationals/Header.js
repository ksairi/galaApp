import React from 'react'
import { View } from 'react-native'
import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import icomoonConfig from '/icomoonConfig.json'


const Icon = createIconSetFromIcoMoon(icomoonConfig)

export default () =>
  <View>
  <Icon name="example" size={80} />
  <Icon name="json" size={80} /> 
</View>
