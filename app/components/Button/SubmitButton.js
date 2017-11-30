import React from 'react'
import Button from 'react-native-button'
import Style from './styles'

export default ({title, onPress}) => 
  <Button
    containerStyle={Style.containerStyle}
    style={Style.fontStyle}
    onPress={onPress()}>
    {title}
  </Button>
  

