const React = require('react')
    , { Text } = require('react-native')
    , { Keys } = require('../../config/settings')

const hs = React.createElement

const GenericText = (props) => {
  return (
    hs(Text, {style: props[Keys.style]}, props[Keys.message])
  )
}

module.exports = {
  GenericText
}