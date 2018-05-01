import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

export default ({visible, message}) =>
  <Spinner visible={visible} textContent={message ? message : 'Cargando'} textStyle={{color: '#FFF'}} />
  