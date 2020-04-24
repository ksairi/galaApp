import React from 'react'
import {Platform, KeyboardAvoidingView} from 'react-native'

export default ({children}) => {
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
        {children}
      </KeyboardAvoidingView>
    )
  }
  return children
}
