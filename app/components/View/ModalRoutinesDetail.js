import React from 'react'
import { Modal, Text, View, ScrollView, Picker } from 'react-native'
import styles from './styles'

export default class modalRoutinesDetail extends React.Component{
  
  state = {
    selectedExerciseText:null,
    selectedExerciseIndex:0
  }

  getExercisesList = () =>{
    const exercisesItems = this.props.routine.exercises.map((exercise, index)=>{
      return <Picker.Item key={index} label={exercise.type} value={exercise.type} />
    })
    return exercisesItems
  }

  getSelectedExerciseJSX = () =>{
    const selectedExercise = this.props.routine.exercises[this.state.selectedExerciseIndex]
    return(
      <View>
        <Text>Series</Text>
        <Text>{selectedExercise.series}</Text>
        <Text>Repeticiones</Text>
        <Text>{selectedExercise.repetitions}</Text>
        <Text>Minutos</Text>
        <Text>{selectedExercise.minutes}</Text>
      </View>
    )
  }

  render(){
    const selectedExerciseJSX = this.getSelectedExerciseJSX()
    return(
      <Modal
        visible={true}
        animationType={'slide'}
        onRequestClose={this.props.closeModal()}
        transparent={true}>
          <ScrollView 
            directionalLockEnabled={true} 
            contentContainerStyle={[styles.rootContainer, styles.modalRootContainer]}
            onPressOut={this.props.closeModal()}>
            <View style={[styles.modalContainer]}>
              <View style={[styles.verticalContainer,styles.modalWrapper]}>
                <Text style={styles.modalTitle}>{this.props.routine.description}</Text>
                <Text>Desde</Text>
                <Text style={styles.modalBody}>{this.props.routine.dateFrom}</Text>
                <Text>Hasta</Text>
                <Text style={styles.modalBody}>{this.props.routine.dateTo}</Text>
                <Text>Profesor</Text>
                <Text style={styles.modalBody}>{this.props.routine.professor}</Text>
                <Text>Ejericios</Text>
                <View>
                  <Picker
                    selectedValue={this.state.selectedExerciseText}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({selectedExerciseIndex: itemIndex, selectedExerciseText:itemValue})}
                    }
                    style={{width:100}}>
                    {this.getExercisesList()}
                  </Picker>
                </View>
                {selectedExerciseJSX}
              </View>
            </View>
          </ScrollView>
      </Modal>
    )
  }

}
