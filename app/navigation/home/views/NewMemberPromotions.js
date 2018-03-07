import React from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import { Keys, Messages } from '/config/settings'
import { GenericText } from '/components/Text'

export default class NewMemberPromotions extends React.Component {
  
  state = {
    freeEntryCode:null,
    hasErrors: false 
  }

  componentDidMount() {
    AsyncStorage.getItem(Keys.userData)
    .then((userDataJson)=>{
      const userData = JSON.parse(userDataJson)
      const newMemberData = userData[Keys.newMember]
      if (newMemberData){
        this.setState({freeEntryCode:newMemberData.freeEntryCode})
      }
    })
    .catch((error)=>{
      this.setState({hasErrors:true})
    })
  }

  render() {
    if(this.hasErrors){
      return(
        <GenericText error={true}>
          {Messages.SYSTEM_READ_ERROR}
        </GenericText>
      )
    }
    else{
      return(
        <View>
          <Text>
            {this.state.freeEntryCode}
          </Text>
        </View>
      )
    }
  }
}