import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";
export default ({contentContainerStyle, ...rest}) => (
  <AwesomeAlert
    {...rest}
    closeOnTouchOutside={true}
    closeOnHardwareBackPress={true}
    showConfirmButton={true}
    confirmText="OK"
    cancelText="Cancelar"
    confirmButtonColor="#DD6B55"
    overlayStyle={{
      backgroundColor: "transparent",
    }}
    contentContainerStyle={{
      ...contentContainerStyle,
      maxWidth: "auto",
    }}
  />
);
