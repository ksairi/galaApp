const React = require('react')
	   , hs = React.createElement
	   , { Button } = require('react-native')
     , { Keys } = require('../config/settings')

const SubmitButton = (props) => {
	return (
    hs(Button, {"title":props.[Keys.buttonTitle], "onPress": () => props.onPress()})
  )
}

module.exports = {
  SubmitButton
}


