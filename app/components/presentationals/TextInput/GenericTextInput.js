import React from 'react'
import { TextInput } from 'react-native'
import Styles from './styles'

export default (props) =>
  <TextInput style={Styles.textInput} 
    underlineColorAndroid='transparent' ref={props.inputRef} {...props} />
    
  
   