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
  },
  notificationListItemText:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width:200  
  },
  unReadNotification:{
    color:'green'
  },
  reeadNotification:{
    color:'black'
  }
})