import React from 'react'
import { Text } from 'react-native'
import Styles from './style'

export default ({children, error}) =>
  <Text style={error? [Styles.genericText, Styles.errorMessage] : Styles.genericText }>
    {children}
  </Text>
