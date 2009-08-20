import React from 'react'
import { FlatList, AsyncStorage } from 'react-native'
import { Keys, Messages } from '../config/settings'
import ContainerStyles from '../components/View/styles'
import { GenericText } from '../components/Text/'
import { GenericContainer } from '../components/View'
import { LoadingSpinner } from '../components/Spinner'
import { RoutineItemList } from '../components/ListItem'

export default class Routines extends React.Component {
  static LocalMessages = {
    NO_ROUTINES:"Sin rutinas"
  }
  
  state = {
    hasErrors:false,
    routinesData:null
  }
  
  componentDidMount() {
    AsyncStorage.getItem(Keys.routines)
    .then((routinesDataJson)=>{
      try{
        var routinesData = JSON.parse(routinesDataJson)
        if (routinesData !== null && routinesData.length > 0){
          this.setState({routinesData})
        }
        else {
          this.setState({routinesData:[]})
        }
      }catch(error){
        this.setState({hasErrors:true})  
      }
    })
    .catch((error)=>{
      this.setState({hasErrors:true})
    })
  }

  render() {
    if(this.state.hasErrors){
      return(
        <GenericText error={true}>
          {Messages.SYSTEM_READ_ERROR}
        </GenericText>
      )
    }
    if(!this.state.routinesData){
      return(
        <LoadingSpinner visible={true}/>
      )
    }
    if(this.state.routinesData.length == 0){
      return(
        <GenericText error={true}>
          {Routines.LocalMessages.NO_ROUTINES}
        </GenericText>
      )  
    }

    return (
      <GenericContainer style={ContainerStyles.rootContainer}>
        <GenericContainer style={ContainerStyles.centredContainer}>
          <GenericContainer style={ContainerStyles.horizontalContainer}>
            <FlatList
              data={this.state.routinesData}
              renderItem={({item}) =>
                <RoutineItemList description={item.description} active={item.isActive} dateFrom={item.dateFrom} dateTo={item.dateTo} onPress={() => console.log(item)}/> 
              }
            />
          </GenericContainer>
        </GenericContainer>
      </GenericContainer>
    )
  }
}