const React = require('react')
		, { TextInput } = require('react-native')
		, { Styles } = require('./styles')

const hs = React.createElement


const GenericInputText = (props) => {
	 return ( 
	 	hs(TextInput, {style: Styles.textInput, ...props}, props.[Keys.componentValue])
	 )
}

module.exports = {
	GenericInputText
}