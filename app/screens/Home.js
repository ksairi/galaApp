import React from 'react'
import { AsyncStorage } from 'react-native'
import { GenericContainer } from '../components/View/'
import { Text, View } from 'react-native'
import { Keys } from '../config/settings'

export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name:''
    }
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }
  async componentDidMount() {

    try {
      var userData = await AsyncStorage.getItem(Keys.userData)
      userData = JSON.parse(userData)
      
      if (userData !== null){
        await this.setStateAsync({name:userData.name})
      }
    } catch (error) {
      this.state.name = "error"
    }
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
}