import React from 'react'
import { Dimensions, ScrollView, StyleSheet } from 'react-native'
import { genericBackgroundColor, containerPadding } from '/config/styles'

const style = StyleSheet.create({
  rootContainer:{
    flexGrow:1,
    backgroundColor: genericBackgroundColor,
    padding: containerPadding,
  }
})
 
const offSet = 0.14

export default class RootContainer extends React.Component{

  state={
    dynamicPaddingTop: Dimensions.get("window").height * offSet
  }

  _onLayout = (e)=> {
    const height = e.nativeEvent.layout.height
    this.setState({dynamicPaddingTop:height * offSet})
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state.dynamicPaddingTop != nextState.dynamicPaddingTop
  }

  render(){
    return(
      <ScrollView contentContainerStyle={[style.rootContainer, {paddingTop: this.state.dynamicPaddingTop}]} onLayout={this._onLayout}> 
        {this.props.children}
      </ScrollView>
    )
  }
}
  