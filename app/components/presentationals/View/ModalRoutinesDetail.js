import React from 'react'
import { Modal, Text, View, ScrollView, Picker } from 'react-native'
import styles from './styles'

export default class modalRoutinesDetail extends React.Component{
  
  state = {
    selectedExerciseText:null,
    selectedExerciseIndex:0
  };

  exerciseType = {
    byRepetitions:1,
    byTime:2
  }

  getExercisesList = () =>{
    const exercisesItems = this.props.routine.exercises.map((exercise, index)=>{
      return <Picker.Item key={index} label={exercise.name} value={exercise.name} />
    })
    return exercisesItems
  }

  getSelectedExerciseJSX = () =>{
    const selectedExercise = this.props.routine.exercises[this.state.selectedExerciseIndex]
    return(
      <View>
        <View style={styles.exerciseDetailWrapper}>
              <Text style={styles.exerciseDetailTitle}>Orden</Text>
              <Text style={styles.exerciseDetailData}>{selectedExercise.order}º</Text>
        </View>
        { this.exerciseType.byRepetitions == selectedExercise.type && 
          <View>
            <View style={styles.exerciseDetailWrapper}>
              <Text style={styles.exerciseDetailTitle}>Series</Text>
              <Text style={styles.exerciseDetailData}>{selectedExercise.series}</Text>
            </View>
          
            <View style={styles.exerciseDetailWrapper}>
              <Text style={styles.exerciseDetailTitle}>Repeticiones</Text>
              <Text style={styles.exerciseDetailData}>{selectedExercise.repetitions}</Text>
            </View>
          </View>
        }

        { this.exerciseType.byTime == selectedExercise.type && 
          <View style={styles.exerciseDetailWrapper}>
            <Text style={styles.exerciseDetailTitle}>Minutos</Text>
            <Text style={styles.exerciseDetailData}>{selectedExercise.minutes}</Text>
          </View>
        }

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
                <View style={{marginTop:10, alignItems: 'center'}}>
                  <Text>Ejericios</Text>
                  
                    <Picker
                      selectedValue={this.state.selectedExerciseText}
                      onValueChange={(itemValue, itemIndex) => {
                        this.setState({selectedExerciseIndex: itemIndex, selectedExerciseText:itemValue})}
                      }
                      style={{width:100}}>
                      {this.getExercisesList()}
                    </Picker>
                  {selectedExerciseJSX}
                </View>
              </View>
            </View>
          </ScrollView>
      </Modal>
    )
  }

}
