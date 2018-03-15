import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { GenericContainer } from '/components/presentationals/View/'
import { ServerProtocol } from '/config/settings'
@connect(
  state => ({userData:state[ServerProtocol.userData]})
)
export default class Home extends React.Component {
  
  render(){
    return (
      <View>
        <Text>
          {this.props.userData.name}
        </Text>
      </View>
    )
  }  
}