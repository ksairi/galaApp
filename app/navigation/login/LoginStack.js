import React from 'react'
import { View, Image } from 'react-native'
import { StackNavigator } from 'react-navigation'
import SignIn from '/screens/SignIn'
import SignUp from '/screens/SignUp'
import ResetPassword from '/screens//ResetPassword'
import { Screens } from '/config/settings'
import globalStyles from '/config/styles'
import Header from '/components/presentationals/LoginStackHeader'

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
      //headerStyle: {textAlign: 'center', backgroundColor: globalStyles.headerBackgroundColor},
      //headerTintColor: '#fff',
      //  headerLeft:<View />,
      //headerLeft:<View />,
      //headerTitle: <Image style={{width:250, height:36, resizeMode:'contain', alignSelf:'center'}} source={require('./splash.png')} />,//<Header style={{resizeMode:'contain', alignSelf: 'center'}}/>,
      //headerTitle:<Header style={{resizeMode:'contain', alignSelf: 'center', }}/>,
      //headerRight: <View style={{height:80, width:80}}/>,
      header:(headerProps)=>
        <Header />
    })
    
  }
)