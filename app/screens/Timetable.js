import React from 'react'
import { ScrollView, AsyncStorage } from 'react-native'
import { Keys, Messages } from '../config/settings'
import ClassesTimeTable from '../components/Table/ClassesTimeTable'
import { GenericText } from '../components/Text/'
import { GenericContainer } from '../components/View'
import ContainerStyles from '../components/View/styles'
import { LoadingSpinner } from '../components/Spinner'
import { observer, inject } from "mobx-react"

@inject("timetableStore")
@observer
export default class TimeTbale extends React.Component {

  state = {
    timeTableData:null,
    hasErrors:false
  }
  
  componentDidMount() {
    AsyncStorage.getItem(Keys.timeTable)
    .then((timeTableData)=>{
      try{
        var timeTableDataJson = JSON.parse(timeTableData)
        if (timeTableDataJson !== null){
          this.setState({timeTableData:timeTableDataJson})
        }
      }catch(error){
        this.setState({hasErrors:true})  
      }
    })
    .catch((error)=>{
      this.setState({hasErrors:true})
    })
  }
  

  render(){
    if(this.state.hasErrors){
      return(
        <GenericText error={true}>
          {Messages.SYSTEM_READ_ERROR}
        </GenericText>
      )
    }
    if(!this.state.timeTableData){
      return(
        <LoadingSpinner visible={true}/>
      )
    }
    const tableHead = ['Hora', 'Lun', 'Mar', 'Miér', 'Jue', 'Vier', 'Sáb']
        , timeTableArray = this.state.timeTableData
    var toReturn = []
      , serverReponseError = false

    timeTableArray.forEach( (venueTimeTable, venueTimeTableIndex) =>{
      var dataRows = []
      
      venueTimeTable.rows.forEach( venueTimeTableRow => {
        if(venueTimeTableRow.classes.length != 6){
           serverReponseError = true
           return 
        }
        const dataRow = [venueTimeTableRow.time, ...venueTimeTableRow.classes]
        dataRows.push(dataRow)
      })

      if(serverReponseError){
        return
      }
      
      toReturn.push(
        <ClassesTimeTable key={venueTimeTableIndex} venueName={venueTimeTable.venue} 
          tableHead={tableHead} dataRows={dataRows}/>
      )
    })

    if(serverReponseError){
      return(
        <GenericContainer style={ContainerStyles.rootContainer}>
          <GenericContainer style={ContainerStyles.centredContainer}>
            <GenericText error={true}>
              {Messages.SERVER_ERROR}
            </GenericText>
          </GenericContainer>
        </GenericContainer>
      )
    }

    toReturn = 
    <ScrollView>
      <GenericContainer style={ContainerStyles.rootContainer}>
        {toReturn}
      </GenericContainer>
    </ScrollView>

    return (toReturn)
  } 
}

