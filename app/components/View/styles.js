import { StyleSheet } from 'react-native'
import { genericBackgroundColor, dynamicPaddingTop } from '../../config/styles'

const containerpadding= 20

export default StyleSheet.create({
  rootContainer:{
    backgroundColor: genericBackgroundColor,
    flex:1,
    padding: containerpadding,
    paddingTop:dynamicPaddingTop
  },
  centredContainer:{
    flex: 2/3,
    alignItems: 'center'
  },
  
  verticalContainer:{
    flexDirection: 'column',
    backgroundColor: genericBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  horizontalContainer:{
    flexDirection: 'row',
    backgroundColor: genericBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  textInputContainer:{
    flexDirection: 'row',
    flex: 1,
    padding: 3
  },
})