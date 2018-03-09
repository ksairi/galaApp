import React from 'react'
import { FlatList, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { Keys, Messages } from '/config/settings'
import ContainerStyles from '/components/presentationals/View/styles'
import { GenericText } from '/components/presentationals/Text/'
import { GenericContainer } from '/components/presentationals/View'
import { LoadingSpinner } from '/components/presentationals/Spinner'
import { RoutineListItem } from '/components/presentationals/ListItem'
import { ModalRoutinesDetail } from '/components/presentationals/View'

class Routines extends React.Component {
  static LocalMessages = {
    NO_ROUTINES:"Sin rutinas"
  }
  
  state = {
    hasErrors:false,
    routinesData:null,
    selectedRoutine:null
  }

  openModal = (selectedRoutine)=> {
    this.setState({selectedRoutine})
  }

  closeModal = ()=> {
    this.setState({selectedRoutine:null})
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

    if(this.state.selectedRoutine != null){
      return (
        <ModalRoutinesDetail routine={this.state.selectedRoutine} 
        closeModal={()=>this.closeModal}/>
      )
    }

    return (
      <GenericContainer style={ContainerStyles.rootContainer}>
        <GenericContainer style={ContainerStyles.centredContainer}>
          <GenericContainer style={ContainerStyles.horizontalContainer}>
            <FlatList
              data={this.props.newRoutines.length > 0 ? this.props.newRoutines : this.state.routinesData}
              renderItem={({item}) =>
                <RoutineListItem description={item.description} active={item.isActive} 
                  dateFrom={item.dateFrom} dateTo={item.dateTo} onPress={() => this.openModal(item)}/> 
              }
            />
          </GenericContainer>
        </GenericContainer>
      </GenericContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    newRoutines: state.newRoutines
  }
}

export default connect(mapStateToProps)(Routines) 