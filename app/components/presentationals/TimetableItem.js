import React from 'react'
import {View, Text} from 'react-native'
export default ({index, image, data}) => (
  <View key={index} style={styles.wrapper}>
    <View style={styles.classWrapper}>
      <Text styles={styles.class}>{data.class}</Text>
      <Text styles={styles.time}>{data.time}</Text>
    </View>
  </View>
)

const styles = {
  wrapper: {
    width: 140,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#324664',
    marginHorizontal: 5,
    flexDirection: 'row'
  },
  time: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#00ffb4'
  },
  classWrapper: {
    width: 140,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#00ffb4',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  class: {
    fontFamily: 'lato-bold',
    fontSize: 18,
    letterSpacing: -0.28,
    color: '#002db9'
  }
}

