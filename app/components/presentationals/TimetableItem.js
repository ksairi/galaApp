import React from 'react'
import {View, Text} from 'react-native'
export default ({index, data}) => (
  <View key={index} style={styles.wrapper}>
    <Text style={styles.class}>{data.class}</Text>
    <Text style={styles.time}>{data.time}</Text>
  </View>
)

const styles = {
  wrapper: {
    width: 150,
    height: 90,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: '#00ffb4',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  class: {
    fontFamily: 'lato-bold',
    fontSize: 14,
    letterSpacing: -0.28,
    color: '#002db9'
  },
  time: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#002db9',
    marginTop: 5
  }
}

