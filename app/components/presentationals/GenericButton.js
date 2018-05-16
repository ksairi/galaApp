import React from 'react'
import { RkTheme, RkButton } from 'react-native-ui-kitten'
import { genericButtonBackgroundColor } from '/components/styles'

RkTheme.setType('RkButton', 'genericButton', {
  backgroundColor: genericButtonBackgroundColor,
  flex:1,
  content:{
    color:'white',
    fontSize:19,
    fontFamily:'lato-regular'
  }
})

export default class GenericButton extends React.PureComponent {

  onButtonPressed = () =>{
    this.props.onPress()
  }

  render(){
    return(
      <RkButton rkType='rounded genericButton' style={this.props.style} contentStyle={this.props.contentStyle ? this.props.contentStyle : {} }
        onPress={this.onButtonPressed}>
        {this.props.text}
      </RkButton>
    )
  }
}
