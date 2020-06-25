import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";

export default ({
  show,
  message,
  title,
  showCancelButton,
  onConfirmPressed,
  onCancelPressed,
  showProgress,
}) => (
  <AwesomeAlert
    {...{
      show,
      title,
      message,
      showCancelButton,
      onConfirmPressed,
      onCancelPressed,
      showProgress,
    }}
    closeOnTouchOutside={true}
    closeOnHardwareBackPress={true}
    showConfirmButton={true}
    confirmText="OK"
    cancelText="Cancelar"
    confirmButtonColor="#DD6B55"
  />
);
