import React from 'react'
import {View, ImageBackground, Text} from 'react-native'
export default ({index, image, data}) => (
  <View key={index} style={{marginHorizontal: 5}}>
    <ImageBackground styles={styles.imgWrapper} source={image} />
    <View styles={styles.dataWrapper}>
      <Text styles={styles.time}>{data.time}</Text>
      <Text styles={styles.saloon}>{data.saloon}</Text>
    </View>
    <View style={styles.classWrapper}>
      <Text styles={styles.class}>{data.class}</Text>
    </View>
  </View>
)

const styles = {
  imgWrapper: {
    width: 250,
    height: 124,
    opacity: 0.45,
    borderRadius: 5
  },
  dataWrapper: {
    width: 250,
    height: 196,
    borderRadius: 5,
    backgroundColor: '#002db9',
    flexDirection: 'row'
  },
  time: {
    width: 44,
    height: 16,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#00ffb4'
  },
  saloon: {
    width: 172,
    height: 18,
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#ffffff'
  },
  classWrapper: {
    width: 68,
    height: 38,
    backgroundColor: '#00ffb4',
    marginTop: -50,
    marginLeft: -5
  },
  class: {
    width: 57,
    height: 22,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.28,
    color: '#000000'
  }
}

