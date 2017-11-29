import React from 'react'
import { Text } from 'react-native'
import Styles from './style'

export default ({children, onPress}) =>
  <Text style={[Styles.genericText, Styles.link]} onPress= {onPress()}>
    {children}
  </Text>
