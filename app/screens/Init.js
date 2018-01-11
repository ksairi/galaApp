import React from 'react'
import { Text, View } from 'react-native'
import { GenericContainer } from '../components/View/'
import containerStyles from '../components/View/styles'
import { Screens, Keys } from '../config/settings'


export default class Init extends React.Component {
	
	constructor(props) {
		super(props)
	}

	render(){
		return (
			<GenericContainer style={containerStyles.rootConatiner}>
				<Text key="1">'Open up App.js to start working on your app from app/index.js'</Text>
			</GenericContainer>
  	)
	}

	componentDidMount(){

		this.timerID = setInterval(()=> {
	  	clearInterval(this.timerID)
	    this.props.navigation.dispatch({
	      key: Screens.SignIn,
	      type: Keys.replaceCurrentScreen,
	      routeName: Screens.SignIn,
      })
	  }
	  , 1000)	
	}
}