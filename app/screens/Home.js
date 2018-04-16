import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { GenericContainer } from '/components/presentationals/View/'
@connect(
  state => ({
    userData:state.userData,
    isUsingCache:state.isUsingCache
  })
)
export default class Home extends React.Component {
  
  render(){
    return (
      <View>
        <Text>
          {this.props.userData.name}
          {this.props.isUsingCache}
        </Text>
        { this.props.isUsingCache &&
          <Text>
            Estas usando informacion local
          </Text>
        }
      </View>
    )
  }  
}