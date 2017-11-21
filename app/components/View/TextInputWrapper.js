const React = require('react')
    , { View, Text } = require('react-native')
    , { Styles } = require('./styles')
    , { Keys } = require ('../../config/settings')

const hs = React.createElement

const TextInputWrapper = (props) => {
  return (
    hs(View, {style: Styles.textInputWrapper}, props[Keys.children])
  )
}

module.exports = {
  TextInputWrapper
}