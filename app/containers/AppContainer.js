import React from 'react'
import { AsyncStorage, BackHandler } from 'react-native'
import AppRoutes from '../config/routes'
import { NavigationActions } from 'react-navigation'
import { Notifications } from 'expo'
import { sendHasReceivedNotification } from '../helpers/ApiHelper'
import { Screens, Keys } from '../config/settings'
import { connect } from 'react-redux'
import { ActionsCreators } from '../actions'
import { bindActionCreators } from 'redux'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { addNavigationHelpers } from 'react-navigation'

class AppContainer extends React.Component{

  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(this.handleNotification)

    BackHandler.addEventListener('backPress', () => {
      const { dispatch, nav } = this.props
      const activeRoute = nav.routes[nav.index]
      if (activeRoute.index === 0) {
        return false
      }
      dispatch(NavigationActions.back())
      return true
    })
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('backPress')
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
    const addListener = createReduxBoundAddListener("root")
    return(
      <AppRoutes 
        navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener})}
      />
    )
  }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    nav: state.nav
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
function mapDispatchToProps(dispatch) {
  //return bindActionCreators(ActionsCreators, dispatch)
  return Object.assign({dispatch: dispatch}, bindActionCreators(ActionsCreators, dispatch))
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
