import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

export default class App extends Component {
  render () {
    return (
      <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={this.props.onPress}>
        <View style={[styles.myButton, this.props.buttonStyle]}>
          {this.props.text && <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>}
          {this.props.children}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  myButton: {
    padding: 15,
    borderRadius: 40,
    backgroundColor: '#6b35e3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'lato-regular'
  }
})
