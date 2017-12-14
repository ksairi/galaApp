import React from 'react'
import { Text, View } from 'react-native'

export default class Routines extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      
    }    
  }
  render() {
    return(
    <View>
      <Text>
        Rutinas
      </Text>
    </View>
    )
  }

  static navigationOptions = {
    drawerLabel: 'Rutinas',
    /*drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),*/
  }
}