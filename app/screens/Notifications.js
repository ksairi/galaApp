import React from 'react'
import { FlatList, AsyncStorage, Text } from 'react-native'
import { Keys, Messages } from '../config/settings'
import ContainerStyles from '../components/View/styles'
import { GenericText } from '../components/Text/'
import { GenericContainer } from '../components/View'
import { LoadingSpinner } from '../components/Spinner'
import { NotificationListItem } from '../components/ListItem'
import { ModalNotificationDetail } from '../components/View'
import { sendHasReadNotification } from '../helpers/ApiHelper'
import { observer, inject } from "mobx-react"

@inject("notificationsStore")
@observer
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
        <ModalNotificationDetail notification={this.state.selectedNotification} 
        closeModal={()=>this.closeModal}/>
      )
    }
    console.log(this.props.notificationsStore)
    return (
      <GenericContainer style={ContainerStyles.rootContainer}>
        <GenericContainer style={ContainerStyles.centredContainer}>
          <GenericContainer style={ContainerStyles.horizontalContainer}>
            <Text>mariano</Text>
            <Text>{this.props.notificationsStore.marianoSurname}</Text>
            <FlatList
              data={this.props.notificationsStore.notificationsArray ? this.props.notificationsStore.notificationsArray : this.state.notificationsData}
              renderItem={({item, index}) =>
                <NotificationListItem title={item.title} unRead={item.unRead} onPress={async () =>{
                    if(item.unRead){
                      const readItem = item
                      readItem.unRead = false
                      const notificationsData = this.state.notificationsData
                      notificationsData[index] = readItem
                      this.setState({notificationsData}, async ()=>{
                        await AsyncStorage.setItem(Keys.notifications, JSON.stringify(this.state.notificationsData))
                        var userData = await AsyncStorage.getItem(Keys.userData)
                        userData = JSON.parse(userData)
                        sendHasReadNotification(userData.userId, readItem.key)
                        this.openModal(item)
                      })
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