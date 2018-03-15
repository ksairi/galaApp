import React from 'react'
import { BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Notifications } from 'expo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { addNavigationHelpers } from 'react-navigation'
import { sendHasReceivedNotification } from '/helpers/ApiHelper'
import { Screens, ServerProtocol } from '/config/settings'
import { ActionsCreators } from './actions'
import AppRoutes from '/navigation/'
import ValidationHelper from '/helpers/ValidationHelper'

@connect(
  state => 
  ({
    nav:state.nav,
    userData: state[ServerProtocol.userData]
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
    
    if(notification.origin === "received"){
      
      if(this.props.userData){
        sendHasReceivedNotification(this.props.userData.userId, notification.data.key)
      }
      if(notification.data[ServerProtocol.timetable]){
        this.props.setTimetable(notification.data[ServerProtocol.timetable])
      }
      else{
          if(notification.data[ServerProtocol.routines]){
            this.props.setRoutines(notification.data[ServerProtocol.routines])
          }
          else{
              if(notification.data[ServerProtocol.notifications]){
                this.props.setNotifications(notification.data[ServerProtocol.notifications])
              }
              else{
                if(notification.data[ServerProtocol.newMember]){
                this.props.setNewMemberData(notification.data[ServerProtocol.newMember])
              }  
              }
          }
        }
    }

    if(notification.origin === "selected"){
      if(this.props.userData){
        if(notification.notificationId && notification.message && notification.experienceId){
          // when the app is opened by selecting the notification and origin=="received" is not received
          sendHasReceivedNotification(this.props.userData.userId, notification.data.key)
        }
        
        //prepares HomeDrawer
        this.props.setIsNewMember(!ValidationHelper.isObjectEmpty(this.props.userData[ServerProtocol.newMember]))
        
        var resetAction
        if(notification.data[ServerProtocol.timetable]){
          resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName:Screens.HomeStack, action:NavigationActions.navigate({routeName:Screens.Timetable})})
            ],
            key: null
          })
        }
        else{
              if(notification.data[ServerProtocol.routines]){
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