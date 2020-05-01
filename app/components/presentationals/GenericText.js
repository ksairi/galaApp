import React from "react";
import {Text} from "react-native";

const styles = {
  errorMessage: {
    color: "red",
  },
  genericText: {
    color: "white",
    textAlign: "center",
    flex: 1,
    fontFamily: "lato-regular",
  },
};

export default class GenericText extends React.PureComponent {
  render() {
    return (
      <Text
        style={[
          styles.genericText,
          this.props.style,
          this.props.error ? styles.errorMessage : null,
        ]}
      >
        {this.props.children}
      </Text>
    );
  }
}
