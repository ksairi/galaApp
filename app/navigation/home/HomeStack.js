import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StackNavigator } from 'react-navigation'
import DrawerStack from './DrawerStack'
import Header from '/components/presentationals/Header'

export default StackNavigator({
  DrawerStack: { screen: DrawerStack }
  },{
      navigationOptions: ({navigation}) => ({
        header:(headerProps)=>
          <Header navigation={navigation} isHomeHeader/>
      })
    }
)
