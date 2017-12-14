import React from 'react'
import { Text, View } from 'react-native'

export default class TimeTbale extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      
    }    
  }
  render() {
    return(
    <View>
      <Text>
        Horarios
      </Text>
    </View>
    )
  }

  static navigationOptions = {
    drawerLabel: 'Horarios',
    /*drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),*/
  }
}