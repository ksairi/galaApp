const React = require('react')
const { StackNavigator } = require('react-navigation')
const { Init }  = require ('../screens/Init')
const { SignIn } = require('../screens/SignIn')
const SignUp = require('../screens/SignUp')
const Profile = require('../screens/Profile')


const AppRoutes = StackNavigator({
  Init: {
    screen: Init
  },
  SignIn: {
    screen: SignIn
  }
})

module.exports = {
	AppRoutes
}