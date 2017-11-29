import React from 'react'
import { Text } from 'react-native'
import Styles from './style'

export default ({children}) =>
  <Text style={Styles.genericText}>
    {children}
  </Text>
