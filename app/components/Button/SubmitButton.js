import React from 'react'
import { Button } from 'react-native'
import { Keys } from '../../config/settings'

export default ({title, onPress}) => 
	<Button title={title} onPress={onPress()} />
  

