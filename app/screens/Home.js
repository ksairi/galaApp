import React from 'react'
import { Text, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import { RkButton } from 'react-native-ui-kitten'
import { NavigationActions } from 'react-navigation'
import { GenericContainer } from '/components/presentationals/View/'
import { ActionsCreators } from '/redux/actions'
import { Screens } from '/config/settings'
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
        <RkButton  rkType='rounded' onPress={()=>
            Alert.alert(
            '',
            '¿Cerrar sesión?',
            [
              {text: 'No', style: 'cancel'},
              {text: 'Sí', onPress: () => {
                  const resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName:Screens.LoginStack})
                  ],
                  key:null
                })
                this.props.dispatch(ActionsCreators.logOut())
                this.props.navigation.dispatch(resetAction)
              }},
            ],
            { cancelable: true }
            )
          }>
          Cerrar Sesion
        </RkButton>
      </View>
    )
  }  
}