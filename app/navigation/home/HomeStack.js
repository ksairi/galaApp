import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StackNavigator } from 'react-navigation'
import DrawerStack from './DrawerStack'
import styles from '/config/styles'
import Header from '/components/presentationals/HomeStackHeader'

export default StackNavigator({
  DrawerStack: { screen: DrawerStack }
  },{
      navigationOptions: ({navigation}) => ({
        header:(headerProps)=>
          <Header navigation={navigation} />
        
        //const isMenuClosed = (navigation.state.index === 0)
        //return {
          //headerStyle: {backgroundColor: styles.headerBackgroundColor},
          //headerTitleStyle: {color:'white', alignSelf: 'center'},
          //
      }) 
    }
    //}
)