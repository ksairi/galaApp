import React from 'react'
import { View, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'
import SignIn from '/screens/SignIn'
import SignUp from '/screens/SignUp'
import ResetPassword from '/screens//ResetPassword'
import { Screens } from '/config/settings'
import Header from '/components/containers/Header'

export default StackNavigator({
  [Screens.SignIn]:{
    screen:SignIn
  },
  [Screens.SignUp]:{
    screen:SignUp
  },
  [Screens.ResetPassword]:{
    screen:ResetPassword
  }
},
  {
    navigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation}/>
    })

  }
)
