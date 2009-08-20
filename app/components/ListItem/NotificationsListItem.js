import React from 'react'
import { Text } from 'react-native'
import ContainerStyles from '../View/styles'
import { GenericContainer } from '../View'
import { ListItemButton } from '../Button'
import styles from './styles'

export default ({title, onPress}) =>

<GenericContainer style={ContainerStyles.horizontalContainer}>
  <Text style={styles.notificationListItemText}>{title}</Text>
  <ListItemButton title="Ver" onPress={()=>onPress} />
</GenericContainer>