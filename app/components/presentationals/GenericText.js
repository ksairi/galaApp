import React from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
  },
  genericText: {
    color: 'white',
    textAlign:'center',
    flex:1,
    fontFamily:'lato-regular'
  }
})

export default ({children, style, error}) =>
  <Text style={[styles.genericText, style, error ? styles.errorMessage : null]}>
    {children}
  </Text>
