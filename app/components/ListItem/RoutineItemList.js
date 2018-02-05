import React from 'react'
import { Text } from 'react-native'
import ContainerStyles from '../View/styles'
import { GenericContainer } from '../View'
import styles from './styles'
export default ({description, active, dateFrom, dateTo}) =>

<GenericContainer style={ContainerStyles.horizontalContainer}>
  <Text style={styles.routineListItemText}>{description}</Text>
  <Text style={styles.routineListItemText}>{dateFrom}</Text>
  <Text style={styles.routineListItemText}>{dateTo}</Text>
</GenericContainer>
