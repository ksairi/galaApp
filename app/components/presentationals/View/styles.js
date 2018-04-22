import { StyleSheet } from 'react-native'
import { genericBackgroundColor, dynamicPaddingTop, deviceWidth } from '/config/styles'

const containerpadding= 20

export default StyleSheet.create({
  rootContainer:{
    backgroundColor: genericBackgroundColor,
    flex:1,
    padding: containerpadding,
    paddingTop:dynamicPaddingTop,
    width:deviceWidth
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
  modalRootContainer:{
    backgroundColor:'rgba(0, 0, 0, 0.5)'
  },
  modalContainer:{
    justifyContent: 'center'
  },
  modalWrapper:{
    padding:10
  },
  modalTitle:{
    fontWeight:'bold', 
    color:'green',
    fontSize:15
  },
  modalBody:{
    fontWeight:'bold', 
    color:'blue',
    fontSize:13
  },
  exerciseDetailTitle:{
    fontWeight:'bold',
    color:'green',
    fontSize:15,
    width:95
  },
  exerciseDetailData:{
    fontWeight:'bold',
    color:'blue',
    fontSize:13,
    width:15
  },
  exerciseDetailWrapper:{
    flexDirection:'row', 
  }
})