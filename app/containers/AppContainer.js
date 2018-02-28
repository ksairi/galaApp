import React from 'react'
import { AsyncStorage } from 'react-native'
import AppRoutes from '../config/routes'
import { NavigationActions } from 'react-navigation'
import { Notifications } from 'expo'
import { sendHasReceivedNotification } from '../helpers/ApiHelper'
import { Screens, Keys } from '../config/settings'
import { connect } from 'react-redux'
import { ActionsCreators } from '../actions'
import { bindActionCreators } from 'redux'



class AppContainer extends React.Component{

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
    
    if(notification.origin === "received"){
      
      if(userData){
        sendHasReceivedNotification(userData.userId, notification.data.key)
      }
      if(notification.data[Keys.timetable]){
        this.props.saveTimetable(notification.data[Keys.timetable])
      }
      else{
          if(notification.data[Keys.routines]){
            this.props.saveRoutines(notification.data[Keys.routines])
          }
          else{
              if(notification.data[Keys.notifications]){
                this.props.saveNotifications(notification.data[Keys.notifications])
              }
          }
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
        
        if(notification.data[Keys.timetable]){
          resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName:Screens.HomeDrawerStack, params:params, action:NavigationActions.navigate(Screens.Timetable)})
            ],
            key: null
          })
        }
        else{
              if(notification.data[Keys.routines]){
                resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName:Screens.HomeDrawerStack, params:params, action:NavigationActions.navigate(Screens.Routines)})
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
  }

  render() {
    return(
      <AppRoutes />
    )
  }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {}
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionsCreators, dispatch)
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
