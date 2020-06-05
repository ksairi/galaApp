import React from "react";
import {View, Text} from "react-native";

const styles = {
  wrapper: {
    width: 150,
    height: 90,
    borderRadius: 4,
    backgroundColor: "#002db9",
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  name: {
    fontFamily: "lato-bold",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "white",
    textAlign: "center",
    width: "100%",
    marginBottom: 3,
  },
  length: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "white",
    textAlign: "center",
    width: "100%",
  },
};

export default ({index, data}) => (
  <View key={index} style={styles.wrapper}>
    <Text style={styles.name}>{data.name}</Text>
    <Text style={styles.length}>
      {data.minutes
        ? `${data.minutes} min`
        : `${data.repetitions} repeticiones`}
    </Text>
    {data.series > 0 && (
      <Text style={styles.length}>{`${data.series} series`}</Text>
    )}
  </View>
);
