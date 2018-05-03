import React from 'react'
import { View, StyleSheet } from 'react-native'
import { genericBackgroundColor, containerPadding } from '/config/styles'
import { connect } from 'react-redux'
import { ActionsCreators } from '/redux/actions'

const styles = StyleSheet.create({
  rootWrapper:{
    flex:1,
    backgroundColor: genericBackgroundColor,
    padding: containerPadding,
  },
  portrait:{
    paddingTop:70
  },
  landscape:{
    paddingTop:40
  }
})
 
@connect(state=>({
  orientation: state.currentOrientation
  })
)
export default class RootWrapper extends React.Component{

  _onLayout = (e)=> {
    this.props.dispatch(ActionsCreators.setCurrentOrientation( e.nativeEvent.layout.height > e.nativeEvent.layout.width ? 'portrait' : 'landscape'))
  }

  render(){
    return(
      <View style={[styles.rootWrapper, styles[this.props.orientation], this.props.style]} onLayout={this._onLayout}> 
        {this.props.children}
      </View>
    )
  }
}
  