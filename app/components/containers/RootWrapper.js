import React from 'react'
import { View } from 'react-native'
import { genericBackgroundColor, containerPadding } from '/components/styles'
import { ActionsCreators } from '/redux/actions'

const styles = {
  rootWrapper:{
    flex:1,
    backgroundColor: genericBackgroundColor,
    padding:containerPadding,
    paddingTop:0,
    paddingBottom:10
  }
}

export default class RootWrapper extends React.PureComponent{
  render(){
    return(
      <View style={[styles.rootWrapper, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}
