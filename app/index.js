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
      })

      .catch((error)=>{
       //user has logged out
       // log in screen is being shown, no need to redirect anywhere       
      })
    }
  }

  render() {

    return <AppRoutes ref={nav => { this.navigator = nav }} />
  }
}
