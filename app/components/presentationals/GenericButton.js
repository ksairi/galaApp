import React from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  myButton: {
    padding: 15,
    borderRadius: 40,
    backgroundColor: "#6b35e3",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 19,
    fontFamily: "lato-regular",
  },
});

export default (props) => (
  <TouchableOpacity
    style={[styles.container, props.containerStyle]}
    onPress={props.onPress}
  >
    <View style={[styles.myButton, props.buttonStyle]}>
      {props.text && (
        <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
      )}
      {props.children}
    </View>
  </TouchableOpacity>
);
