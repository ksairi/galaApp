import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Messages } from '/config/settings'
import { GenericText } from '/components/presentationals/Text'

@connect(
state => ({
  newMemberData:state.newMemberData,
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
            {this.props.newMemberData && this.props.newMemberData.freeEntryCode}
          </GenericText>
          { this.props.newMemberData.freeEntryDaysLeft &&
            <GenericText> Te quedan {this.props.newMemberData.freeEntryDaysLeft} dias </GenericText> 
          }
        </View>
      )
    }
  }
}