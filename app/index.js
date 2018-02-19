import React from 'react'
import { AsyncStorage } from 'react-native'
import AppRoutes from './config/routes'
import { NavigationActions } from 'react-navigation'
import { Notifications } from 'expo'
import { sendHasReceivedNotification } from './helpers/ApiHelper'
import { Screens, Keys } from './config/settings'
import { Provider } from "mobx-react"
import NotificationsStore from './stores/NotificationsStore'
import stores from './stores'

export default class index extends React.Component{

  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(this.handleNotification)
  }

  handleNotification = async (notification) => {
    var userData
    try{
      userData = await AsyncStorage.getItem(Keys.userData)
      userData = JSON.parse(userData)
    }catch(error){

    }
    await NotificationsStore.saveNotifications(notification.data)

    if(notification.origin === "received"){
      if(userData){
        sendHasReceivedNotification(userData.userId, notification.data.key)
      }
    }
    if(notification.origin === "selected"){
      if(userData){
        if(notification.notificationId && notification.message && notification.experienceId){
          // when the app is opened by selecting the notification and origin=="received" is not received
          sendHasReceivedNotification(userData.userId, notification.data.key)
        }
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
    }
  }

  render() {

    return(
      <Provider {...stores}>
        <AppRoutes ref={nav => { this.navigator = nav }} />
      </Provider>
    )
  }
}
