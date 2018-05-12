import React from 'react'
import Icon from 'helpers/ImageHelper'

export default class extends React.Component {
  render(){
    return(
      <Icon style={this.props.style} name="logo-gala" color='white'/>
    )
  }
}
