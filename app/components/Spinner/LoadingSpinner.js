import React from 'react'
import { View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { Messages } from '../../config/settings'

export default ({visible}) =>
  <View style={{ flex: 1 }}>
    <Spinner visible={visible} textContent={Messages.LOADING} textStyle={{color: '#FFF'}} />
  </View>
  