import React from "react";
import {ScrollView} from "react-native";
import {useDimensions} from "@react-native-community/hooks";

export default ({children, contentContainerStyle, containerStyle}) => {
  return (
    <ScrollView
      contentContainerStyle={[
        {
          flexGrow: 1,
        },
        contentContainerStyle,
      ]}
      style={[
        {
          backgroundColor: "#12194d",
          maxHeight: useDimensions().window.height,
        },
        containerStyle,
      ]}
    >
      {children}
    </ScrollView>
  );
};
