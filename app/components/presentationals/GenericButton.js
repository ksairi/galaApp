import React from 'react'
// import { RkButton } from 'react-native-ui-kitten'

const styles = {
  buttonStyle: {
    backgroundColor: '#6b35e3',
    flex: 1
  },
  buttonContent: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'lato-regular'
  }
}

export default class GenericButton extends React.PureComponent {
  render () {
    var shapeType = 'rounded'
    if (this.props.shapeType) {
      shapeType = this.props.shapeType
    }
    return (null
      // <RkButton
      //   rkType={shapeType}
      //   style={[styles.buttonStyle, this.props.style]}
      //   contentStyle={[styles.buttonContent, this.props.contentStyle]}
      //   onPress={this.props.onPress}>
      //   {this.props.text}
      // </RkButton>
    )
  }
}
