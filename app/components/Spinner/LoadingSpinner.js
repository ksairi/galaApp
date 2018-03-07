import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { Messages } from '/config/settings'

export default ({visible}) =>
  <Spinner visible={visible} textContent={Messages.LOADING} textStyle={{color: '#FFF'}} />
  