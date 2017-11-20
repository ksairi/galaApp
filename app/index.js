const React = require('react')
const { Text, View } = require('react-native')
const { AppRoutes } = require('./config/routes')
const hs = React.createElement


const App = () => {
  return hs(AppRoutes)
}

module.exports = {
	App
}