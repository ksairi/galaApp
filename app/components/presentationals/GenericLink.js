import React from 'react'
import { TouchableOpacity } from 'react-native'
import GenericText from './GenericText'

export default ({text, containerStyle, contentStyle, onPress}) =>
  <TouchableOpacity style={[{flex:1}, containerStyle]} onPress={onPress()}>
    <GenericText style={[contentStyle]}>
      {text}
    </GenericText>
  </TouchableOpacity>
