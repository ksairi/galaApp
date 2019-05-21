import React from 'react'
import { TouchableOpacity } from 'react-native'
import GenericText from './GenericText'

export default class GenericLink extends React.PureComponent {

  onLinkPressed = () => {
    this.props.onPress()
  }

  render () {
    return (
      <TouchableOpacity style={this.props.containerStyle} onPress={this.onLinkPressed}>
        <GenericText style={this.props.contentStyle}>
          {this.props.children}
        </GenericText>
      </TouchableOpacity>
    )
  }
}
