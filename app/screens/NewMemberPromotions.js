import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Messages } from '/config/settings'
import { GenericText } from '/components/presentationals/Text'
import { ServerProtocol } from '/config/settings'

@connect(
state => ({
  [ServerProtocol.newMember]:state.userData[ServerProtocol.newMember],
})
)
export default class NewMemberPromotions extends React.Component {
  
  state = {
    hasErrors: false 
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
          <GenericText>
            {this.props[ServerProtocol.newMember] && this.props[ServerProtocol.newMember][ServerProtocol.freeEntryCode]}
          </GenericText>
          { this.props[ServerProtocol.newMember][ServerProtocol.freeEntryDaysLeft] &&
            <GenericText> Te quedan {this.props[ServerProtocol.newMember][ServerProtocol.freeEntryDaysLeft]} dias </GenericText> 
          }
        </View>
      )
    }
  }
}