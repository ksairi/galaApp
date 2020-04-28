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
  const [classes, setClasses] = useState([])

  useEffect(() => {
    setClasses(
      navigation.state.params.classes.map(({name, url}) => 
        ({date: name.substring(name.indexOf('-') + 1), url}))
    )
  }, [])

  const Item = ({ date, url }) => (
    <TouchableOpacity style={styles.item} 
      onPress={() => navigation.navigate(Screens.VideoPlayer, {url, title: `${navigation.state.params.title} - ${date}` })}>
      <Text style={styles.name}>{date}</Text>
    </TouchableOpacity>
    )
  return (
    <RootWrapper style={{ padding: 0 }}>
    {classes.length > 0 ?
        <CentredWrapper>
          <FlatList
            data={classes}
            renderItem={({ item }) => <Item date={item.date} url={item.url} />}
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
