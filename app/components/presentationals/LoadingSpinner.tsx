import React, {ReactElement} from "react";
import {ActivityIndicator, View} from "react-native";

type Props = {
  visible?: boolean;
};
export default (props: Props): ReactElement =>
  props.visible && (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="small" color="white" />
    </View>
  );
