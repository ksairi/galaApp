const React = require('react')
    , { StackNavigator } = require('react-navigation')
    , { Init }  = require ('../screens/Init')
    , { SignIn } = require('../screens/SignIn')
    , { SignUp } = require('../screens/SignUp')
    , { Profile } = require('../screens/Profile')
    , { Screens } = require('../config/settings')


const AppRoutes = StackNavigator({
  [Screens.Init]: {
    screen: Init
  },
  [Screens.SignIn]: {
    screen: SignIn
  }
})

module.exports = {
	AppRoutes
}