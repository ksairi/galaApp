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
        <DrawerItems {...props} items={filteredItems} itemStyle={{height:70}} iconContainerStyle={{paddingLeft:3, height:100, width:100, marginTop:20}} />
      </SafeAreaView>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
 return {
    isNewMember: !isObjectEmpty(state.newMemberData)
  }
}

export default connect(mapStateToProps)(DrawerContentComponent)