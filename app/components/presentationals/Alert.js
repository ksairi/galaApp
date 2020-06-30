import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";

export default (props) => (
  <AwesomeAlert
    {...props}
    closeOnTouchOutside={true}
    closeOnHardwareBackPress={true}
    showConfirmButton={true}
    confirmText="OK"
    cancelText="Cancelar"
    confirmButtonColor="#DD6B55"
  />
);
