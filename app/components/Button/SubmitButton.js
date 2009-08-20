import React from 'react'
import Button from 'react-native-button'
import Style from './styles'

export default ({title, onPress}) => 
  <Button
    containerStyle={Style.submitButtonContainer}
    style={Style.submitButtonFont}
    onPress={onPress()}>
    {title}
  </Button>
  

