import React from 'react'
import { View, Text } from 'react-native'
import Styles from './styles'

export default ({children}) =>
  <View style={Styles.rootWrapper}>
    {children}
  </View>