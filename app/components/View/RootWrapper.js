const React = require('react')
    , { View, Text } = require('react-native')
    , { Styles } = require('./styles')
    , { Keys } = require ('../../config/settings')

const hs = React.createElement

const RootWrapper = (props) => {
  return (
    hs(View, {style: Styles.rootWrapper}, props[Keys.children])
  )
}

module.exports = {
  RootWrapper
}