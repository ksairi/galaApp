import React from 'react'
import { Text, View } from 'react-native'
import { Table, Row, Rows} from 'react-native-table-component'
import styles from './styles'
import { GenericContainer } from '../View'
import ContainerStyles from '../View/styles'


export default ({venueName, tableHead, dataRows}) =>
  <GenericContainer style={ContainerStyles.verticalContainer}>
    <Text style={styles.venueName}>{venueName}</Text>
    <Table style={styles.table}> 
      <Row data={tableHead} style={styles.head} textStyle={[styles.text, styles.headText]}/> 
      <Rows data={dataRows} style={styles.row} textStyle={[styles.text, styles.rowText]} />
    </Table> 
  </GenericContainer>


