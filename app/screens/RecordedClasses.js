import React, { useEffect, useState } from 'react'
import {FlatList, Text, TouchableOpacity, Alert} from 'react-native'
import ApiHelper from '/helpers/ApiHelper'
import LoadingSpinner from '/components/presentationals/LoadingSpinner'
import RootWrapper from '/components/presentationals/RootWrapper'
import {Screens} from '/config/settings'
import CentredWrapper from '/components/presentationals/CentredWrapper'
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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchRecordedClasses = async () => {
      try {
        setLoading(true)
        const classes = await ApiHelper.getRecordedClasses()
        setClasses(classes)
        setLoading(false)
      } catch (e) {
        Alert.alert('', 'Error de conexion. Por favor intenta mas tarde',
          [
            {
              text: 'OK',
              onPress: () => { navigation.navigate(Screens.Home) }
            }
          ]
        )
      }
    }
    fetchRecordedClasses()
  }, [])

  if (loading) {
    return (
      <RootWrapper>
        <LoadingSpinner visible={loading} />
      </RootWrapper>
    )
  }

  const Item = ({ name, url }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(Screens.VideoPlayer, {url, title: name})}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
    )

  return (
    <RootWrapper style={{ padding: 0 }}>
      <Text style={{ color: 'white', alignSelf: 'center', marginVertical: 10, fontSize: 18, fontFamily: 'lato-regular' }}>CLASES GRABADAS</Text>
      <CentredWrapper>
        <FlatList
          data={classes}
          renderItem={({ item }) => <Item name={item.name} url={item.url} />}
          keyExtractor={item => item.url}
          style={{marginTop: 20}}
        />
      </CentredWrapper>
    </RootWrapper>
  )
}
