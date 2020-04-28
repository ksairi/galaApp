import React from 'react'
import { createStackNavigator } from 'react-navigation'
import DrawerStack from './DrawerStack'
import { Screens } from '/config/settings'
import Settings from '/screens/Settings'
import Header from '/components/containers/Header'
import VideoPlayer from '/screens/VideoPlayer'
import RecordedClassesByDate from '/screens/RecordedClassesByDate'

const SettingsNavigator = createStackNavigator(
  {
    [Screens.Settings]: { screen: Settings }
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
          navigation={navigation}
          title='CONFIGURACIÓN'
          backScreen={Screens.Profile}
        />
      )
    })
  }
)

const RecordedClassesByDateNavigator = createStackNavigator(
  {
    [Screens.RecordedClassesByDate]: { screen: RecordedClassesByDate }
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
          navigation={navigation}
          title={`CLASES GRABADAS DE ${navigation.state.params.title}`}
          backScreen={Screens.RecordedClassesByClass}
        />
      )
    })
  }
)

export default createStackNavigator({
  DrawerStack: { screen: DrawerStack },
  [Screens.Settings]: { screen: SettingsNavigator },
  [Screens.VideoPlayer]: { screen: VideoPlayer },
  [Screens.RecordedClassesByDate]: { screen: RecordedClassesByDateNavigator }
},
  {
    headerMode: 'none'
  })
