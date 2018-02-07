import React from 'react'
import { Modal, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import styles from './styles'

export default ({notification, closeModal}) =>
  <Modal
    visible={true}
    animationType={'slide'}
    onRequestClose={closeModal()}
    transparent={true}>
    <TouchableOpacity 
      style={[styles.rootContainer, styles.modalRootContainer]} 
      activeOpacity={1} 
      onPressOut={closeModal()}>
      <ScrollView 
        directionalLockEnabled={true} 
        contentContainerStyle={[styles.centredContainer,styles.modalContainer]}>
        <View style={[styles.verticalContainer,styles.modalWrapper,{backgroundColor:'yellow'}]}>
          <Text style={styles.modalTitle}>{notification.title}</Text>
          <Text style={styles.modalBody}>{notification.body}</Text>
        </View>
      </ScrollView>
    </TouchableOpacity>
  </Modal>