import React from 'react'
import { TouchableOpacity } from 'react-native'
import GenericText from './GenericText'

export default ({text, style, onPress}) =>
  <TouchableOpacity style={{flex:1}} onPress={onPress()}>
    <GenericText style={style}>
      {text}
    </GenericText>
  </TouchableOpacity>
