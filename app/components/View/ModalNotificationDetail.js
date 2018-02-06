import React from 'react'
import { Modal, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import styles from './styles'

export default ({modalVisible, notification, closeModal}) =>
  <Modal
    visible={modalVisible}
    animationType={'slide'}
    onRequestClose={closeModal()}
    transparent={true}>
    <TouchableOpacity 
      style={[styles.rootContainer,{backgroundColor:'yellow'}]} 
      activeOpacity={1} 
      onPressOut={closeModal()}>
      <ScrollView 
        directionalLockEnabled={true} 
        contentContainerStyle={styles.rootContainer}>

      <View style={styles.rootContainer}>
        <View style={styles.verticalContainer}>
          <Text style={styles.modalTitle}>{notification.title}</Text>
          <Text style={styles.modalBody}>{notification.body}</Text>
        </View>
      </View>
    </ScrollView>
  </TouchableOpacity>
  </Modal>

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },
});*/