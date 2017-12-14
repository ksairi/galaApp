import React from 'react'
import { Text, View } from 'react-native'

export default class Notifications extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      
    }    
  }
  render() {
    return(
    <View>
      <Text>
        Notificaciones
      </Text>
    </View>
    )
  }

  static navigationOptions = {
    drawerLabel: 'Notificaciones',
    /*drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),*/
  }
}