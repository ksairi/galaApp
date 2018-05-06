import React from 'react'
import {View } from 'react-native'
import Icon from 'helpers/ImageHelper'

export default ({style, logoSize})=>
  
    <Icon style={[{flex:1.5}, style]} name="logo-gala" size={logoSize ? logoSize : 250} color='white'/>
    