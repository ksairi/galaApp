import React from 'react'
import { AsyncStorage, BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Notifications } from 'expo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { addNavigationHelpers } from 'react-navigation'
import { sendHasReceivedNotification } from '/helpers/ApiHelper'
import { Screens, Keys } from '/config/settings'
import { ActionsCreators } from './actions'
import AppRoutes from '/navigation/'
import ValidationHelper from '/helpers/ValidationHelper'


@connect(
  state => 
  ({
    nav:state.nav,
    userData: state.userData
  }),
  dispatch => 
  Object.assign({}, {dispatch}, bindActionCreators(ActionsCreators, dispatch))  
)

export default class AppContainer extends React.Component{

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
      //userData = await AsyncStorage.getItem(Keys.userData)
      //userData = JSON.parse(userData)
      userData = this.props.userData
    }catch(error){

    }
    
    if(notification.origin === "received"){
      
      if(userData){
        sendHasReceivedNotification(userData.userId, notification.data.key)
      }
      if(notification.data[Keys.timetable]){
        this.props.setTimetable(notification.data[Keys.timetable])
      }
      else{
          if(notification.data[Keys.routines]){
            this.props.setRoutines(notification.data[Keys.routines])
          }
          else{
              if(notification.data[Keys.notifications]){
                this.props.setNotifications(notification.data[Keys.notifications])
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
        this.props.setIsNewMember(!ValidationHelper.isObjectEmpty(userData[Keys.newMember]))
        var resetAction
        if(notification.data[Keys.timetable]){
          resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName:Screens.HomeStack, action:NavigationActions.navigate({routeName:Screens.Timetable})})
            ],
            key: null
          })
        }
        else{
              if(notification.data[Keys.routines]){
                resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName:Screens.HomeStack, action:NavigationActions.navigate({routeName:Screens.Routines})})
                  ],
                  key: null
                })    
              }
              else{
                    resetAction = NavigationActions.reset({
                      index: 0,
                      actions: [
                        NavigationActions.navigate({routeName:Screens.HomeStack, action:NavigationActions.navigate({routeName:Screens.Notifications})})
                      ],
                      key: null
                    })
                  }
            }

        this.props.dispatch(resetAction)
        //https://github.com/react-navigation/react-navigation/issues/1620
        //https://github.com/react-navigation/react-navigation/issues/1715
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