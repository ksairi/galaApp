import React, { useEffect, useState } from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import RootWrapper from '/components/presentationals/RootWrapper'
import {Screens} from '/config/settings'
import CentredWrapper from '/components/presentationals/CentredWrapper'
import GenericText from '/components/presentationals/GenericText'

const styles = {
  item: {
    padding: 10
  },
  name: {
    color: 'white'
  }
}

export default ({navigation}) => {
  let [filteredRecordings, setFilteredRecordings] = useState([])
  useEffect(() => {
    const classesByName = navigation.state.params.classes
    classesByName.forEach(({name, url}) =>{
      const dateToSearch = name.substring(name.indexOf('-') + 1, name.indexOf('-') + 9).trim()
      const classesByDate = classesByName.filter(({name}) =>
        name.substring(name.indexOf('-') + 1, name.indexOf('-') + 9).trim() 
          === dateToSearch)
      
        if(!filteredRecordings.find(({date}) => dateToSearch === date)) {
        filteredRecordings = [...filteredRecordings, {
          date: dateToSearch, 
          url, 
          classes: classesByDate
        }]
    }})
    filteredRecordings.sort((a, b) => {
      var nameA = a.date.toUpperCase()
      var nameB = b.date.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
    setFilteredRecordings(filteredRecordings)
  }
  , [])
  const Item = ({ date, url, classes }) => (
    <TouchableOpacity style={styles.item} 
      onPress={() => {classes.length > 1 ? navigation.navigate(Screens.RecordedClassesByTime, {classes, name: `${navigation.state.params.name} - ${date}` }) :
        navigation.navigate(Screens.VideoPlayer, {url, title: `${navigation.state.params.name} - ${date}` })}}>
      <Text style={styles.name}>{date}</Text>
    </TouchableOpacity>
    )
  return (
    <RootWrapper style={{ padding: 0 }}>
    {filteredRecordings.length > 0 ?
        <CentredWrapper>
          <FlatList
            data={filteredRecordings}
            renderItem={({ item }) => <Item date={item.date} url={item.url} classes={item.classes} />}
            keyExtractor={item => item.url}
            style={{marginTop: 20}}
          />
        </CentredWrapper>
      : (
      <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
        <GenericText
          style={{ fontFamily: 'brother-1816-bold', fontSize: 22, color: 'white', flex: -1 }}>
          ¡Ups!
        </GenericText>
        <GenericText style={{ fontSize: 18 }}>
          No hay clases grabadas aun!
        </GenericText>
      </View>
      )
    }
    </RootWrapper>
  )
}
