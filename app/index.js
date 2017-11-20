const React = require('react')
    , { Text, View } = require('react-native')
    , { AppRoutes } = require('./config/routes')
    , hs = React.createElement


const App = () => {
  return hs(AppRoutes)
}

module.exports = {
	App
}