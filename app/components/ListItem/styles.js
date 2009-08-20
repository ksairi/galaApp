import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  routineListItemText:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width:90
  },
  activeRoutine:{
    color:'green'
  },
  inactiveRoutine:{
    color:'red'
  }
})