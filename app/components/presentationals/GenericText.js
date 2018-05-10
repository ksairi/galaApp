import React from 'react'
import { Text } from 'react-native'

const styles = {
  errorMessage: {
    color: 'red',
  },
  genericText: {
    color: 'white',
    textAlign:'center',
    flex:1,
    fontFamily:'lato-regular'
  }
}

export default ({children, style, error}) =>
  <Text style={[styles.genericText, style, error ? styles.errorMessage : null]}>
    {children}
  </Text>
