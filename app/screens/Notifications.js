import React from 'react'
import { FlatList, AsyncStorage} from 'react-native'
import { Keys, Messages } from '../config/settings'
import ContainerStyles from '../components/View/styles'
import { GenericText } from '../components/Text/'
import { GenericContainer } from '../components/View'
import { LoadingSpinner } from '../components/Spinner'
import { NotificationListItem } from '../components/ListItem'
import { ModalNotificationDetail } from '../components/View'

export default class Notifications extends React.Component {
  static LocalMessages = {
    NO_NOTIFICATIONS:"Sin Notificaciones"
  }
  
  state = {
    hasErrors:false,
    notificationsData:null,
    selectedNotification:null
  }

  openModal = (selectedNotification)=> {
    this.setState({selectedNotification})
  }

  closeModal = ()=> {
    this.setState({selectedNotification:null})
  }
  
  componentDidMount() {
    AsyncStorage.getItem(Keys.notifications)
    .then((notificationsDataJson)=>{
      try{
        var notificationsData = JSON.parse(notificationsDataJson)
        if (notificationsData !== null && notificationsData.length > 0){
          this.setState({notificationsData})
        }
        else {
          this.setState({notificationsData:[]})
        }
      }catch(error){
        this.setState({hasErrors:true})  
      }
    })
    .catch((error)=>{
      this.setState({hasErrors:true})
    })
  }

  render() {
    if(this.state.hasErrors){
      return(
        <GenericText error={true}>
          {Messages.SYSTEM_READ_ERROR}
        </GenericText>
      )
    }
    if(!this.state.notificationsData){
      return(
        <LoadingSpinner visible={true}/>
      )
    }
    if(this.state.notificationsData.length == 0){
      return(
        <GenericText error={true}>
          {Notifications.LocalMessages.NO_NOTIFICATIONS}
        </GenericText>
      )  
    }

    if(this.state.selectedNotification != null){
      return (
        <ModalNotificationDetail modalVisible={this.state.modalVisible} 
          notification={this.state.selectedNotification} closeModal={()=>this.closeModal}/>
      )
    }

    return (
      <GenericContainer style={ContainerStyles.rootContainer}>
        <GenericContainer style={ContainerStyles.centredContainer}>
          <GenericContainer style={ContainerStyles.horizontalContainer}>
            <FlatList
              data={this.state.notificationsData}
              renderItem={({item}) =>
                <NotificationListItem title={item.title} onPress={() => 
                  this.openModal(item)
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

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },
});*/