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
  }
  componentDidMount() {

    AsyncStorage.getItem(Keys.timeTable)
    .then((timeTableData)=>{
      var timeTableDataJson = JSON.parse(timeTableData)
      if (timeTableDataJson !== null){
        this.setState({timeTableData:timeTableDataJson})
      }
    })
    .catch((error)=>{
      //TODO SHOW ERROR ON SCREEN
    })
  }
  

  render(){
    if(!this.state.timeTableData){
      return(
        <View><Text>Loading...</Text></View>
      )
    }
    const tableHead = ['HORA', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']
        , timeTableArray = this.state.timeTableData
    var toReturn = []
    timeTableArray.forEach( (venueTimeTable, venueTimeTableIndex) =>{
      var dataRows = []
      venueTimeTable.rows.forEach( venueTimeTableRow => {
        if(venueTimeTableRow.classes.length != 6){
          console.log("error")
          return //TODO SHOW ERROR ON DATA FROM SERVER
        }
        const dataRow = [venueTimeTableRow.time, ...venueTimeTableRow.classes]
        dataRows.push(dataRow)
      })
      
      toReturn.push(
        <View key={venueTimeTableIndex}>
          <Text>{venueTimeTable.venue}</Text>
          <Table> 
            <Row data={tableHead} style={styles.head} textStyle={styles.text}/> 
            <Rows data={dataRows} style={styles.row} textStyle={styles.text} />
          </Table> 
        </View>
      )
    })

    toReturn = <View>{toReturn}</View>
    return (toReturn)
  } 
}
 

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { marginLeft: 5 },
  row: { height: 30 }
})
