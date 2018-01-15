import React from 'react'
import { Text, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
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
      const resetAction = NavigationActions.reset({
	      index: 0,
	      actions: [
	        NavigationActions.navigate({routeName:Screens.LoginStack})
	      ],
	      key:null
    	})
      this.props.navigation.dispatch(resetAction)
	  }
	  , 1000)	
	}
}