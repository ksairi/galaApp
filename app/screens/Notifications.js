import React from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Messages, ServerProtocol } from '/config/settings'
import ContainerStyles from '/components/presentationals/View/styles'
import { GenericText } from '/components/presentationals/Text/'
import { GenericContainer } from '/components/presentationals/View'
import { NotificationListItem } from '/components/presentationals/ListItem'
import { ModalNotificationDetail } from '/components/presentationals/View'
import { sendHasReadNotification } from '/helpers/ApiHelper'
import { ActionsCreators } from '/redux/actions'
@connect(
  state =>
  ({
    notifications:state[ServerProtocol.notifications],
    userData: state[ServerProtocol.userData]
  })
)
export default class Notifications extends React.Component {
  static LocalMessages = {
    NO_NOTIFICATIONS:"Sin Notificaciones"
  }
  
  state = {
    hasErrors:false,
    selectedNotification:null
  }

  openModal = (selectedNotification)=> {
    this.setState({selectedNotification})
  }

  closeModal = ()=> {
    this.setState({selectedNotification:null})
  }
  
  render() {
    if(this.state.hasErrors){
      return(
        <GenericText error={true}>
          {Messages.SYSTEM_READ_ERROR}
        </GenericText>
      )
    }
    if(this.props.notifications.length == 0){
      return(
        <GenericText error={true}>
          {Notifications.LocalMessages.NO_NOTIFICATIONS}
        </GenericText>
      )  
    }

    if(this.state.selectedNotification != null){
      return (
        <ModalNotificationDetail notification={this.state.selectedNotification} 
        closeModal={()=>this.closeModal}/>
      )
    }
    return (
      <GenericContainer style={ContainerStyles.rootContainer}>
        <GenericContainer style={ContainerStyles.centredContainer}>
          <GenericContainer style={ContainerStyles.horizontalContainer}>
            <FlatList
              data={this.props.notifications}
              renderItem={({item, index}) =>
                <NotificationListItem title={item.title} unRead={item.unRead} onPress={async () =>{
                    if(item.unRead){
                      const readItem = item
                      readItem.unRead = false
                      this.props.dispatch(ActionsCreators.setReadNotification(index))
                      sendHasReadNotification(this.props.userData.userId, readItem.key)
                      this.openModal(item)
                    }
                    else{
                      this.openModal(item)
                    }
                  }
                }
                /> 
              }
            />
          </GenericContainer>
        </GenericContainer>
      </GenericContainer>
    )
  }
}