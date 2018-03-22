import React from 'react'
import { BackHandler, NetInfo } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Notifications } from 'expo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { addNavigationHelpers } from 'react-navigation'
import { Screens, ServerProtocol } from '/config/settings'
import { ActionsCreators } from './actions'
import AppRoutes from '/navigation/'
import ValidationHelper from '/helpers/ValidationHelper'
import NetworkHelper from '/helpers/NetworkHelper'
import { syncStoreWithServer } from '/helpers/StoreHelper'

@connect(
  state => 
  ({
    nav:state.nav,
    userData: state[ServerProtocol.userData],
    notifications: state[ServerProtocol.notifications]
  }),
  dispatch => 
  Object.assign({}, {dispatch}, bindActionCreators(ActionsCreators, dispatch))  
)

export default class AppContainer extends React.Component{

  static BATCH_PROCESS_INTERVAL = 50000;
  static intervalId

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

    NetInfo.addEventListener(
    'connectionChange',
    this.handleConnectivityChange
    )

    AppContainer.intervalId = setInterval(this.startBatchProcess, AppContainer.BATCH_PROCESS_INTERVAL)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress')
    
    this.notificationSubscription.remove()
    
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    )

    clearInterval(AppContainer.intervalId)
  }

  handleNotification = async (notification) => {
    
    if(notification.origin === "received"){
      
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

  handleConnectivityChange = (connectionInfo) => {
    if(NetworkHelper.isDeviceConnected(connectionInfo)){
      this.props.dispatch(ActionsCreators.setIsUsingCache(false))
      this.props.dispatch(ActionsCreators.fetchUserStore())
    }
    else{
      this.props.dispatch(ActionsCreators.setIsUsingCache(true))
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

  startBatchProcess = () => {
    //syncStoreWithServer(this.props.userData.userId, this.props.notifications, this.props.dispatch)
  }
}