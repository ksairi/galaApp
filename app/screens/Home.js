import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { GenericContainer } from '/components/presentationals/View/'

@connect(
  state => ({userData:state.userData})
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