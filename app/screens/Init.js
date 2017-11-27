import React from 'react'
import { Text, View } from 'react-native'
import { RootWrapper } from '../components/View/'
import { compose, lifecycle } from 'recompose'
import { Screens } from '../config/settings'

const component = compose(
	lifecycle ({
	componentDidMount(){
	  const timerID = setInterval(()=> {
	    clearInterval(timerID)
	    this.props.navigation.navigate(Screens.SignIn)
	  }
	  , 1000)
	}
})
)(Init)

function Init(){
	return (
		<RootWrapper>
			<Text key="1">'Open up App.js to start working on your app from app/index.js'</Text>
		</RootWrapper>
  )
}

module.exports = {
  Init: component
}