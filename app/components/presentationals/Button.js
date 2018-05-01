import React from 'react'
import { RkButton } from 'react-native-ui-kitten'

export default ({rkType, style, contentStyle, text, onPress})=>
  <RkButton  rkType={rkType} style={style} contentStyle={contentStyle} text={text} onPress={() => onPress()}>
    {text}
  </RkButton>