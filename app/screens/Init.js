import React from 'react'
import { Text, View } from 'react-native'
import { RootWrapper } from '../components/View/'
import { Screens } from '../config/settings'


export default class Init extends React.Component {
	
	constructor(props) {
		super(props)
	}

	render(){
		return (
			<RootWrapper>
				<Text key="1">'Open up App.js to start working on your app from app/index.js'</Text>
			</RootWrapper>
  	)
	}

	componentDidMount(){

		this.timerID = setInterval(()=> {
	  	clearInterval(this.timerID)
	    this.props.navigation.navigate(Screens.SignIn)
	  }
	  , 1000)	
	}
}