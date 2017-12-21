import React from 'react'
import { AsyncStorage, Text, View, StyleSheet } from 'react-native'
import { Keys } from '../config/settings'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

export default class TimeTbale extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      timeTableData:null
    }

    console.log("hola")
    AsyncStorage.getItem(Keys.timeTable)
    .then((timeTableData)=>{
      var timeTableDataJson = JSON.parse(timeTableData)
      if (timeTableDataJson !== null){
        this.state.timeTableData = timeTableDataJson
      }
    })
    .catch((error)=>{
      //TODO SHOW ERROR ON SCREEN
    })
  }
  

  render(){
    
    const tableHead = ['HORA', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']
        , timeTableArray = this.state.timeTableData
    console.log(timeTableArray)
    timeTableArray.forEach( venueTimeTable =>{
      var dataRows = []
      venueTimeTable.rows.forEach( venueTimeTableRow => {
        if(venueTimeTableRow.classes.length != 5){
          console.log("error")
          return //TODO SHOW ERROR ON DATA FROM SERVER
        }
        const dataRow = [venueTimeTableRow.time, ...venueTimeTableRow.classes]
        dataRows = dataRows.concat(dataRow)
      })
    })

    return (
      <View> 
        <View> {venueTimeTable.venue} </View> 
        <Table> 
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/> 
          <Rows data={dataRows} style={styles.row} textStyle={styles.text} />
        </Table> 
      </View>

    )
  }
}

  /*setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }*/

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { marginLeft: 5 },
  row: { height: 30 }
})