import React from "react";
import {Text} from "react-native";
import {isRestrictedLogin} from "helpers/LoginHelper";
import {connect} from "react-redux";
import {TouchableOpacity} from "react-native-gesture-handler";
import ActionsCreators from "redux/actions";

const RestrictedUserData = ({userData, dispatch}) =>
  isRestrictedLogin(userData.password) && (
    <>
      <Text style={{color: "white", alignSelf: "center"}}>
        {"Socio: "} {userData.name}
        {"  "} - {"  "}
        {"DNI: "}
        {userData.userId}
        {"    "}
      </Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(ActionsCreators.logout());
          dispatch(ActionsCreators.setIsInSession(false));
        }}
      >
        <Text style={{color: "white", alignSelf: "center"}}>Salir</Text>
      </TouchableOpacity>
    </>
  );

export default connect(() => ({}))(RestrictedUserData);
