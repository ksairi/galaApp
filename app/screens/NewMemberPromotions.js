import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Messages } from '/config/settings'
import { GenericText } from '/components/presentationals/Text'

@connect(
state => ({newMember:state.userData.newMember})
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
            {this.props.newMember && this.props.newMember.freeEntryCode}
          </GenericText>
        </View>
      )
    }
  }
}