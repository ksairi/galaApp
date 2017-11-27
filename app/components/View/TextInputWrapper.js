import React from 'react'
import { View, Text } from 'react-native'
import Styles from './styles'
import { Keys } from '../../config/settings'

export default ({children}) =>
  <View style={Styles.textInputWrapper}>
    {children}
  </View>