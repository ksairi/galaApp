import React from 'react'
import { AsyncStorage, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StackNavigator, NavigationActions } from 'react-navigation'
import { Screens, Keys } from '/config/settings'
import DrawerStack from './drawers/DrawerStack'
import styles from '/config/styles'

export default StackNavigator({
  DrawerStack: { screen: DrawerStack }
  },{
      navigationOptions: ({navigation}) => {
        const isMenuClosed = (navigation.state.index === 0)
        return {
          headerStyle: {backgroundColor: styles.headerBackgroundColor},
          headerTitleStyle: {color:'white', alignSelf: 'center'},
          headerLeft: 
            <Ionicons.Button name={isMenuClosed ? "md-menu" : "md-close"} 
            style={{backgroundColor: styles.headerBackgroundColor}} size={30} onPress={()=>{
              if (isMenuClosed) {
                  navigation.navigate('DrawerOpen')
                }else {
                  navigation.navigate('DrawerClose')
                }
              }}
            />,
          headerRight:
            <MCIcons.Button
              name={'logout'}
              size={26}
              style={{backgroundColor: styles.headerBackgroundColor}}
              onPress={()=>
                Alert.alert(
                '',
                '¿Cerrar sesión?',
                [
                  {text: 'No', style: 'cancel'},
                  {text: 'Sí', onPress: () => {
                    AsyncStorage.multiRemove([Keys.userId, Keys.userData, Keys.timetable, Keys.newMember, Keys.notifications, Keys.routines])
                    .then(()=>{
                      const resetAction = NavigationActions.reset({
                      index: 0,
                      actions: [
                        NavigationActions.navigate({routeName:Screens.LoginStack})
                      ],
                      key:null
                    })
                    navigation.dispatch(resetAction)
                    })
                  }},
                ],
                { cancelable: true }
                )
              }
            />
        } 
      }
    }
)



