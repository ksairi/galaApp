import React from "react";
import {View, StyleSheet, TextInput} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: "center",
  },
  inputText: {
    height: 60,
    backgroundColor: "#12194d",
    width: 300,
    borderRadius: 40,
    paddingLeft: 10,
  },
});

export default (props) => (
  <View style={[styles.container, props.containerStyle]}>
    <TextInput
      style={[styles.inputText, props.inputStyle]}
      value={props.text}
      placeholderTextColor="white"
      {...props.inputProps}
    />
  </View>
);
