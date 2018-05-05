import React from 'react'
import { RkTheme, RkButton } from 'react-native-ui-kitten'
import globalStyles from '/config/styles'

RkTheme.setType('RkButton', 'genericButton', {
  backgroundColor: globalStyles.genericButtonBackgroundColor,
  flex:1,
  content:{
    color:'white',
    fontSize:19,
    fontWeight:'bold'
  }
})


export default ({rkType, style, contentStyle, text, onPress})=>
  <RkButton rkType='rounded genericButton' style={style} contentStyle={contentStyle} onPress={() => onPress()}>
    {text}
  </RkButton>