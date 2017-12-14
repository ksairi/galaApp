import React from 'react'
import { Text, View } from 'react-native'

export default class Contact extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      
    }    
  }
  render() {
    return(
    <View>
      <Text>
        Contact
      </Text>
    </View>
    )
  }

  static navigationOptions = {
    drawerLabel: 'Contacto',
    /*drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),*/
  }
}