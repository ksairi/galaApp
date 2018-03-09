import React from 'react'
import { Text } from 'react-native'
import ContainerStyles from '../View/styles'
import { GenericContainer } from '../View'
import { ListItemButton } from '../Button'
import styles from './styles'

export default ({description, active, dateFrom, dateTo, onPress}) =>

<GenericContainer style={ContainerStyles.horizontalContainer}>
  <Text style={[styles.routineListItemText, getRowStyle(active)]}>{description}</Text>
  <Text style={[styles.routineListItemText, getRowStyle(active)]}>{dateFrom}</Text>
  <Text style={[styles.routineListItemText, getRowStyle(active)]}>{dateTo}</Text>
  <ListItemButton title="Detalle" onPress={()=>onPress} />
</GenericContainer>

getRowStyle = (active) => active ? styles.activeRoutine:styles.inactiveRoutine