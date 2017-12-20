import React from 'react'
import { AsyncStorage, Text, View } from 'react-native'
import { Keys } from '../config/settings'

export default class TimeTbale extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      timeTableData:null
    }    
  }
  

  render(){
    return(
    <View>
      <Text>
        {JSON.stringify(this.state.timeTableData)}
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
      const timeTableData = await AsyncStorage.getItem(Keys.timeTable)
      timeTableData = JSON.parse(timeTableData)
      
      if (timeTableData !== null){
        console.log(timeTableData)
        await this.setStateAsync({timeTableData})
      }
    } catch (error) {
      console.log(error)
      this.state.timeTableData = "error"
    }
  }
}