const React = require('react')
		, { Text, View } = require('react-native')
		, { RootWrapper } = require('../components/View/')
		, { compose, lifecycle } = require('recompose')
		, { Screens } = require('../config/settings')

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