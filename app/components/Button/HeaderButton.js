import React from 'react'
import Button from 'react-native-button'
import Style from './styles'

export default ({title, onPress}) => 
  <Button
    containerStyle={Style.headerButtonContainerStyle}
    style={Style.headerButtonFontStyle}
    onPress={onPress}>
    {title}
  </Button>
  

