import React from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Messages } from '/config/settings'
import ContainerStyles from '/components/presentationals/View/styles'
import { GenericText } from '/components/presentationals/Text/'
import { GenericContainer } from '/components/presentationals/View'
import { LoadingSpinner } from '/components/presentationals/Spinner'
import { RoutineListItem } from '/components/presentationals/ListItem'
import { ModalRoutinesDetail } from '/components/presentationals/View'


@connect(
  state => ({routines:state.routines})
) 
export default class Routines extends React.Component {
  static LocalMessages = {
    NO_ROUTINES:"Sin rutinas"
  }
  
  state = {
    hasErrors:false,
    selectedRoutine:null
  }

  openModal = (selectedRoutine)=> {
    this.setState({selectedRoutine})
  }

  closeModal = ()=> {
    this.setState({selectedRoutine:null})
  }
  
  render() {
    if(this.state.hasErrors){
      return(
        <GenericText error={true}>
          {Messages.SYSTEM_READ_ERROR}
        </GenericText>
      )
    }
    
    if(this.props.routines.length == 0){
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
              data={this.props.routines}
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