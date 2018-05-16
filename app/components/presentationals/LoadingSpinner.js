import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

export default class LoadingSpinner extends React.PureComponent{
  render(){
    return (
      <Spinner visible={this.props.visible} textContent={this.props.message ? this.props.message : 'Cargando'} textStyle={{color: '#FFF'}} />
    )
  }
}
