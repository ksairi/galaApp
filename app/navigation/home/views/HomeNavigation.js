import React from 'react'
import HomeStack from '../HomeStack'
import { addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'

const mapStateToProps = (state) => {
 return {
    nav: state.nav
  }
}


class HomeNavigation extends React.Component {
  
  render(){
    const { nav, dispatch } = this.props
    const addListener = createReduxBoundAddListener("root")   
    return(
      <HomeStack
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: nav,
            addListener
          })
        }
      />
    )
  }
}

export default connect(mapStateToProps)(HomeNavigation)