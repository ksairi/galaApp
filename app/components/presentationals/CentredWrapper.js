import React from 'react'
import { View } from 'react-native'

const styles = {
  centredWrapper:{
    flex:1,
    alignItems: 'center'
  },
}

export default class extends React.PureComponent{
  render(){
    return(
      <View style={[styles.centredWrapper, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}
