const React = require('react')
    , { Text } = require('react-native')
    , { Keys } = require('../../config/settings')
    , { Styles } = require('./style')

const hs = React.createElement

const ErrorText = (props) => {
  return (
    hs(Text, {style: Styles.errorMessage}, props[Keys.message])
  )
}

module.exports = {
  ErrorText
}