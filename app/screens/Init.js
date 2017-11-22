const React = require('react')
const { Text, View } = require('react-native')
const { RootWrapper } = require('../components/View/')
const { compose, lifecycle } = require('recompose')
const { Screens } = require('../config/settings')

const hs = React.createElement

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
		hs(RootWrapper, {"children" : [hs(Text,{key:'1'},'Open up App.js to start working on your app from app/index.js')]})
  )
}

module.exports = {
  Init: component
}