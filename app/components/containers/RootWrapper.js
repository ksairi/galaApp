import React from 'react'
import { View } from 'react-native'
import { genericBackgroundColor, containerPadding } from '/components/styles'
import { connect } from 'react-redux'
import { ActionsCreators } from '/redux/actions'

const styles = {
  rootWrapper:{
    flex:1,
    backgroundColor: genericBackgroundColor,
    padding: containerPadding,
  },
  portrait:{
    paddingTop:0
  },
  landscape:{
    paddingTop:0
  }
}
 
function RootWrapper({children, orientation, style}){
  return(
    <View style={[styles.rootWrapper, styles[orientation], style]}> 
      {children}
    </View>
  )
}

function mapStateToProps(state){
  return({
    orientation:state.currentOrientation
  })
}
  
export default connect(mapStateToProps)(RootWrapper)