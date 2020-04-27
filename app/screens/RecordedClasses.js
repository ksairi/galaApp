import React, { useEffect, useState, Fragment } from 'react'
import {FlatList, Text, TouchableOpacity, Alert, View} from 'react-native'
import ApiHelper from '/helpers/ApiHelper'
import LoadingSpinner from '/components/presentationals/LoadingSpinner'
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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchRecordedClasses = async () => {
      try {
        setLoading(true)
        const classes = await ApiHelper.getRecordedClasses()
        setClasses(classes)
        setLoading(false)
      } catch (e) {
        Alert.alert('', e,
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
    {classes.length > 0 ?
      <Fragment>
        <Text style={{ color: 'white', alignSelf: 'center', marginVertical: 10, fontSize: 18, fontFamily: 'lato-regular' }}>CLASES GRABADAS</Text>
        <CentredWrapper>
          <FlatList
            data={classes}
            renderItem={({ item }) => <Item name={item.name} url={item.url} />}
            keyExtractor={item => item.url}
            style={{marginTop: 20}}
          />
        </CentredWrapper>
      </Fragment>
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
