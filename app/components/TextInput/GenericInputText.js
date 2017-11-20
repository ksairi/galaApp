const React = require('react')
		, { TextInput } = require('react-native')
		, { Styles } = require('./styles')
    , { Keys } = require('../../config/settings')

const hs = React.createElement


const GenericInputText = (props) => {
	 return ( 
	 	hs(TextInput, {style: Styles.textInput, ...props})
	 )
}

module.exports = {
	GenericInputText
}