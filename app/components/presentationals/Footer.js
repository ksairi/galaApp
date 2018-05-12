import React from 'react'
import { View } from 'react-native'
import { RkTheme, RkButton } from 'react-native-ui-kitten'
import Icon from '/helpers/ImageHelper'
import { footerButtonBc } from '/components/styles'
import GenericText from '/components/presentationals/GenericText'

const styles = {
  button:{
    backgroundColor: footerButtonBc,
    width:60,
    marginRight:20
  },
  text:{
    fontSize:14,
    fontFamily:'lato-bold',
    flex:0
  }
}

export default () =>{

  return(
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <View style={{ flexDirection:'row', flex:0, paddingBottom:20}}>
        <RkButton rkType='rounded' style={styles.button}>
          <Icon name='classes' size={40} color='white'/>
        </RkButton>
        <RkButton rkType='rounded' style={styles.button}>
          <Icon name='classes' size={40} color='white'/>
        </RkButton>
        <RkButton rkType='rounded' style={styles.button}>
          <Icon name='classes' size={40} color='white'/>
        </RkButton>
      </View>
      <View style={{flex:0, alignItems:'center', justifyContent:'center'}}>
        <GenericText style={styles.text}>WWW.GALAGYM.COM</GenericText>
        <GenericText style={styles.text}>ALL RIGHTS RESERVED GALAGYM 2018</GenericText>
      </View>
    </View>
  )
}
