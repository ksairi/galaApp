import React from 'react'
import { ScrollView } from 'react-native'

export default class GenericScrollView extends React.PureComponent {
  render () {
    return (
      <ScrollView
        contentContainerStyle={[
          {
            flexGrow: 1
          },
          this.props.contentContainerStyle
        ]}
        style={{ backgroundColor: '#12194d' }}>
        {this.props.children}
      </ScrollView>
    )
  }
}
