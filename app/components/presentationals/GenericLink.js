import React from 'react'
import { TouchableOpacity } from 'react-native'
import GenericText from './GenericText'

export default ({children, containerStyle, contentStyle, onPress}) =>
  <TouchableOpacity style={containerStyle} onPress={onPress()}>
    <GenericText style={contentStyle}>
      {children}
    </GenericText>
  </TouchableOpacity>
