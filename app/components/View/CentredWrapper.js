const React = require('react')
    , { View, Text } = require('react-native')
    , { Styles } = require('./styles')
    , { Keys } = require ('../../config/settings')

const hs = React.createElement

const CentredWrapper = (props) => {
  return (
    hs(View, {style: Styles.centredWrapper}, props[Keys.children])
  )
}

module.exports = {
  CentredWrapper
}