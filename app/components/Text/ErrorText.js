import React from 'react'
import { Text } from 'react-native'
import { Keys } from '../../config/settings'
import Styles from './style'

export default ({children}) =>
  <Text style={Styles.errorMessage}>
    {children}
  </Text>
