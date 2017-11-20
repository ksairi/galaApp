const React = require('react')
const { Text, View } = require('react-native')
const { RootView } = require('../components/View/')
const { compose, lifecycle } = require('recompose')

const hs = React.createElement

const component = compose(
	lifecycle ({
	componentDidMount(){
	  const timerID = setInterval(()=> {
	    clearInterval(timerID)
	    this.props.navigation.navigate('SignIn')
	  }
	  , 4000)
	}
})
)(Init)

function Init(){
	return (
		hs(RootView, {"children" : [hs(Text,{key:'1'},'Open up App.js to start working on your app from app/index.js')]})
  )
}

module.exports = {
  Init: component
}