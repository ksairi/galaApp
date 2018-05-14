import React from 'react'
import { View } from 'react-native'
import { LoadingSpinner } from '/components/presentationals/Spinner'
import { connect } from 'react-redux'
import { Screens, ServerProtocol } from '/config/settings'
import { login } from '/helpers/ApiHelper'
import { setInitialData } from '/helpers/StoreHelper'
import { ActionsCreators } from '/redux/actions'

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
}

@connect(state=>({
  isAppsFirstTime:state.isAppsFirstTime,
  isLoggedIn:state.isLoggedIn,
  userId:state.userData.userId,
  password:state.userData.password
  })
)

export default class CheckUserActivity extends React.PureComponent {

  static isInLoggingProcess = false

  constructor(props){
    super(props)
    this.checkUserStatus()
  }

  async checkUserStatus(){

    if(this.props.isAppsFirstTime){
    //if(1==1){
      this.props.navigation.navigate(Screens.Welcome)
    }
    else{
        if(this.props.isLoggedIn){
          try{
            CheckUserActivity.isInLoggingProcess = true
            const httpResponse = await login(this.props.userId, this.props.password)
            if(httpResponse[ServerProtocol.statusField] == ServerProtocol.OK) {
              setInitialData(httpResponse.data, this.props.userId, this.props.password, this.props.dispatch)
              this.props.navigation.navigate(Screens.HomeStack)
            }
            else{
              this.props.dispatch(ActionsCreators.setAutoLoginErrorMessage(httpResponse[ServerProtocol.messageField]))
              this.props.navigation.navigate(Screens.LoginStack)
            }
          }
            catch(error){
              this.props.dispatch(ActionsCreators.setAutoLoginErrorMessage(error))
              this.props.navigation.navigate(Screens.LoginStack)
            }
        }
        else{
          this.props.navigation.navigate(Screens.LoginStack)
        }
    }
  }

  render(){

    return(
      <View style={styles.container}>
        { CheckUserActivity.isInLoggingProcess && <LoadingSpinner visible={true} message={ 'Loguiando' }/>  }
      </View>
    )
  }
}
