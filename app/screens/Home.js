import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { GenericContainer } from '/components/presentationals/View/'
import { ActionsCreators } from '/redux/actions'
@connect(
  state => ({
    userData:state.userData,
    isUsingCache:state.isUsingCache,
    currentHomeDrawerOption:state.currentHomeDrawerOption
  })
)
export default class Home extends React.Component {
  
  componentDidMount(){
    if(this.props.currentHomeDrawerOption != ''){
      this.props.navigation.navigate(this.props.currentHomeDrawerOption)
      this.props.dispatch(ActionsCreators.setCurrentHomeDrawerOption(''))
    }
  }
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