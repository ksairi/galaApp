import React from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
  },
  genericText: {
    color: 'white',
    padding:10,
    textAlign:'center'
  },
  link: {
    color:'green',
  }
})

export default ({children, error}) =>
  <Text style={[styles.genericText, error ? styles.errorMessage : null]}>
    {children}
  </Text>
