import React from 'react'
import { AsyncStorage } from 'react-native'
import AppRoutes from './config/routes'
import { NavigationActions } from 'react-navigation'
import { Notifications } from 'expo'
import { saveNotifications } from './helpers/NotificationsHelper'
import { Screens, Keys } from './config/settings'

export default class index extends React.Component{

  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(this.handleNotification)
  }

  handleNotification = async (notification) => {
    if(notification.origin === "received"){
      notification.unRead = true
      saveNotifications(notification)
    }

    if(notification.origin === "selected"){
      this.notification = notification
      try{
        const userDataJson = await AsyncStorage.getItem(Keys.userData)
        if(userDataJson){
          const userData = JSON.parse(userDataJson)
          var resetAction
          const params = {[Keys.newMember]:userData[Keys.newMember]}
          if(notification.data[Keys.timeTable]){
            resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName:Screens.HomeDrawerStack, params:params, action:NavigationActions.navigate(Screens.TimeTable)})
              ],
              key: null
            })
          }
          else{
                await saveNotifications(notification)
                
                resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName:Screens.HomeDrawerStack, params:params, action:NavigationActions.navigate(Screens.Notifications)})
                  ],
                  key: null
                })
              }
        }
        this.navigator.dispatch(resetAction)
        //https://github.com/react-navigation/react-navigation/issues/1620
      }catch(error){
        //no need to redirect, we are in loggin screen already
      }
    }
  }

  render() {

    return <AppRoutes ref={nav => { this.navigator = nav }} />
  }
}
