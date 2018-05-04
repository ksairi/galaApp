import React from 'react'
import { View } from 'react-native'
import { genericBackgroundColor, containerPadding } from '/config/styles'
import { connect } from 'react-redux'
import { ActionsCreators } from '/redux/actions'

  function _onLayout(e, dispatch) {
    dispatch(ActionsCreators.setCurrentOrientation( e.nativeEvent.layout.height > e.nativeEvent.layout.width ? 'portrait' : 'landscape'))
  }

  function RootView({children, dispatch}){
    return(
      <View style={{flex:1}} onLayout={(e)=>_onLayout(e, dispatch)}> 
        {children}
      </View>
    )
  }

function mapStateToProps(state){
  return({
    orientation:state.currentOrientation
  })
}
  
export default connect(mapStateToProps)(RootView)