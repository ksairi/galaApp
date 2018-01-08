import React from 'react'
import { AsyncStorage, Text, View } from 'react-native'
import { Table, Row, Rows} from 'react-native-table-component'
import styles from './styles'

export default ({venueName, tableHead, dataRows}) =>
  <View>
    <Text>{venueName}</Text>
    <Table> 
      <Row data={tableHead} style={styles.head} textStyle={styles.text}/> 
      <Rows data={dataRows} style={styles.row} textStyle={styles.text} />
    </Table> 
  </View>


