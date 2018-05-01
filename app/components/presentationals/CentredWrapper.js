import React from 'react'
import {View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  centredWrapper:{
    alignItems: 'center'
  },
})

export default ({style, children})=>
  <View style={[styles.centredWrapper, style]}> 
    {children}
  </View>  