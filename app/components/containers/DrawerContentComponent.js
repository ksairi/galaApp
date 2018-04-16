import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { DrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import { Screens } from '/config/settings'
import { isObjectEmpty } from '/helpers/ValidationHelper'

function DrawerContentComponent(props){

  var filteredItems = props.items
  if(!props.isNewMember){
    filteredItems = props.items.filter(item => item.routeName != Screens.NewMemberPromotions)
  }
  return (
    <ScrollView>
      <SafeAreaView style={{flex:1}} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} items={filteredItems} />
      </SafeAreaView>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  console.log(state.newMemberData)
 return {
    isNewMember: !isObjectEmpty(state.newMemberData)
  }
}

export default connect(mapStateToProps)(DrawerContentComponent)