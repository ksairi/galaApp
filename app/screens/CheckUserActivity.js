import React from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { Screens } from '/config/settings'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

function CheckUserActivity(props){

  props.navigation.navigate(props.isAppsFirstTime ? Screens.Welcome : Screens.LoginStack)
  //props.navigation.navigate(1==1 ? Screens.Welcome : Screens.LoginStack)

  return(
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
}

const mapStateToProps = (state) => {
 return {
  isAppsFirstTime:state.isAppsFirstTime
 }
}

export default connect(mapStateToProps)(CheckUserActivity)