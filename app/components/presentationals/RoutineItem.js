import React from 'react'
import {View, Text} from 'react-native'
export default ({index, data}) => (
  <View key={index} style={styles.wrapper}>
    <View styles={styles.dataWrapper}>
      <Text styles={styles.name}>{data.name}</Text>
      <Text styles={styles.length}>
        {data.minutes ? `${data.minutes} min` : `${data.repetitions} repeticiones`}
      </Text>
        {data.series && <Text styles={styles.length}>
          {`${data.series} series`}
        </Text>
      }
    </View>
  </View>
)

const styles = {
  wrapper: {
    width: 260,
    height: 128,
    borderRadius: 4,
    backgroundColor: '#324664',
    marginHorizontal: 5,
    flexDirection: 'row'
  },
  img: {
    width: 144,
    height: 124
  },
  dataWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  name: {
    width: 108,
    height: 21,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#ffffff'
  },
  length: {
    width: 134,
    height: 17,
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    color: '#e4e8f0',
    marginTop: 5
  }
}

