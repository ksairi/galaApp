import React, {Component} from 'react'
import {View, StyleSheet, TextInput} from 'react-native'

export default class RoundedTextInput extends Component {

  render () {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TextInput
          style={[styles.inputText, this.props.inputStyle]}
          value={this.props.text}
          placeholderTextColor='white'
          {...this.props.inputProps}
        />
      </View>
       )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center'
  },
  inputText: {
    height: 60,
    backgroundColor: '#12194d',
    width: 300,
    borderRadius: 40,
    paddingLeft: 10
  }
})
