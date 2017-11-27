import React from 'react'
import { TextInput } from 'react-native'
import Styles from './styles'
import { Keys } from '../../config/settings'

export default (props) =>
  <TextInput style={Styles.textInput} 
    underlineColorAndroid='transparent' {...props} />
	 