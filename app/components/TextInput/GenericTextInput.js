const React = require('react')
		, { TextInput } = require('react-native')
		, { Styles } = require('./styles')
    , { Keys } = require('../../config/settings')

const hs = React.createElement


const GenericTextInput = (props) => {
	 return ( 
	 	hs(TextInput, {style: Styles.textInput, underlineColorAndroid: 'transparent' ,...props})
	 )
}

module.exports = {
	GenericTextInput
}