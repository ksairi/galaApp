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

  handleNotification = (notification) => {
    if(notification.origin === "received"){
      saveNotifications(notification.data)
    }

    if(notification.origin === "selected"){
      this.notification = notification
      console.log(this.notification)
      AsyncStorage.getItem(Keys.userData)
      .then((userDataJson)=>{
        if(userDataJson){
          const userData = JSON.parse(userDataJson)
          var resetAction
          const params = {[Keys.newMember]:userData[Keys.newMember]}
          if(notification.data[Keys.timeTable]){
            resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName:Screens.HomeDrawerStack, params:params, action:Screens.TimeTable})
              ],
              key: null
            })
          }
          else{
                resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName:Screens.HomeDrawerStack, params:params, action:Screens.Notifications})
                  ],
                  key: null
                })
              }
        }
        this.navigator.dispatch(resetAction)
        /*else{
              resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({routeName:Screens.LoginStack})
                ],
                key: null
              })
            }*/
        
      })
    }
  }

  render() {

    return <AppRoutes ref={nav => { this.navigator = nav }} />
  }
}
