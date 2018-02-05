import React from 'react'
import { FlatList } from 'react-native'
import ContainerStyles from '../components/View/styles'
import { GenericText } from '../components/Text/'
import { GenericContainer } from '../components/View'
import ContainerStyles from '../components/View/styles'
import { LoadingSpinner } from '../components/Spinner'


export default class Routines extends React.Component {
  static Messages = {
    NO_ROUTINES:"Sin rutinas"
  }
  
  state = {
    hasErrors:false,
    routinesData:[]
  }
  
  componentDidMount() {
    AsyncStorage.getItem(Keys.routines)
    .then((routinesData)=>{
      try{
        var routinesDataJson = JSON.parse(routinesData)
        if (routinesDataJson !== null){
          this.setState({routinesData:routinesDataJson})
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
    if(this.hasErrors){
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
    if(this.state.routinesData.isEmpty){
      return(
        <GenericText error={true}>
          {this.Messages.NO_ROUTINES}
        </GenericText>
      )  
    }

    return (
      <GenericContainer style={ContainerStyles.rootContainer}>
        <GenericContainer style={ContainerStyles.centredContainer}>
          <GenericContainer style={ContainerStyles.horizontalContainer}>
            <FlatList
              data={this.state.routinesData}
              renderItem={({routine}) => this.showRoutine(routine)}
            />
          </GenericContainer>
        </GenericContainer>
      </GenericContainer>
    )
  }

  showRoutine = (routine) =>{
    console.log(routine)
  }
}