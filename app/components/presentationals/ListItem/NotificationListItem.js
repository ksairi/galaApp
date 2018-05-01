import React from 'react'
import { Text } from 'react-native'
import ContainerStyles from '../View/styles'
import { GenericContainer } from '../View'
import { ListItemButton } from '../Button_old'
import styles from './styles'

export default ({title, onPress, unRead}) =>

  <GenericContainer style={ContainerStyles.horizontalContainer}>
    <Text style={[styles.notificationListItemText, unRead && styles.unReadNotification]}>{title}</Text>
    <ListItemButton title="Ver" onPress={()=>onPress} />
  </GenericContainer>