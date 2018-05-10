import React from 'react'
import { RkTheme, RkButton } from 'react-native-ui-kitten'
import { genericButtonBackgroundColor } from '/components/styles'

RkTheme.setType('RkButton', 'genericButton', {
  backgroundColor: genericButtonBackgroundColor,
  flex:1,
  content:{
    color:'white',
    fontSize:19,
    fontFamily:'lato-regular'
  }
})


export default ({rkType, style, contentStyle, text, onPress})=>
  <RkButton rkType='rounded genericButton' style={style} contentStyle={contentStyle} onPress={() => onPress()}>
    {text}
  </RkButton>