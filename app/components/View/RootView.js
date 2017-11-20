const React = require('react')
    , { View, Text } = require('react-native')
    , { Styles } = require('./styles')
    , { Keys } = require ('../../config/settings')

const hs = React.createElement

const RootView = (props) => {
  return (
    hs(View, {style: Styles.container}, props[Keys.children])
  )
}

module.exports = {
  RootView
}