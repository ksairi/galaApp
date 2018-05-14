import React from 'react'
import { TouchableOpacity } from 'react-native'
import GenericText from './GenericText'

export default class extends React.PureComponent{
  render(){
    return(
      <TouchableOpacity style={this.props.containerStyle} onPress={()=>this.props.onPress()}>
        <GenericText style={this.props.contentStyle}>
          {this.props.children}
        </GenericText>
      </TouchableOpacity>
    )
  }
}
