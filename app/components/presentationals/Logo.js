import React from 'react'
import Icon from 'helpers/ImageHelper'

export default class extends React.PureComponent {
  render(){
    console.log('logo')
    return(
      <Icon style={this.props.style} name="logo-gala" color='white'/>
    )
  }
}
