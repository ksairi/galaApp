import React from 'react'
import { AsyncStorage } from 'react-native'
import { Text, View } from 'react-native'
import { Keys } from '/config/settings'
import { GenericContainer } from '/components/View/'

export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name:''
    }
    this.setStateAsync = this.setStateAsync.bind(this)
  }

  render(){
    return (
      <View>
        <Text>
          {this.state.name}
        </Text>
      </View>
    )
  }
  
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }
  async componentDidMount() {

    try {
      const userData = await AsyncStorage.getItem(Keys.userData)
      userData = JSON.parse(userData)
      
      if (userData !== null){
        await this.setStateAsync({name:userData.name})
      }
    } catch (error) {
      this.state.name = "error"
    }
  }
}