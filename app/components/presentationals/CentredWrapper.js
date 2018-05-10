import React from 'react'
import { View } from 'react-native'

const styles = {
  centredWrapper:{
    flex:1,
    alignItems: 'center'
  },
}

export default ({style, children})=>
  <View style={[styles.centredWrapper, style]}> 
    {children}
  </View>  