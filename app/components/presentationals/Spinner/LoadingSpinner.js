import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { Messages } from '/config/settings'

export default ({visible, message}) =>
  <Spinner visible={visible} textContent={message ? message : Messages.LOADING} textStyle={{color: '#FFF'}} />
  