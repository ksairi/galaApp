import React from "react";
import {Text} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {genericBackgroundColor} from "components/styles";
import RootWrapper from "components/presentationals/RootWrapper";
import CentredWrapper from "components/presentationals/CentredWrapper";

import {Screens} from "config/settings";

const styles = {
  container: {
    backgrondColor: genericBackgroundColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontFamily: "lato-bold",
    fontSize: 21,
  },
  textWrapper: {
    padding: 20,
  },
};

function PayMonthlyFee({navigation}) {
  return (
    <RootWrapper>
      <CentredWrapper style={{justifyContent: "center"}}>
        <TouchableOpacity
          style={styles.textWrapper}
          onPress={() => navigation.navigate(Screens.PayFaceToFaceMonthlyFee)}
        >
          <Text style={styles.text}>PLAN PRESENCIAL MENSUAL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textWrapper}
          onPress={() => navigation.navigate(Screens.PayVirtualMonthlyFee)}
        >
          <Text style={styles.text}>PLAN VIRTUAL MENSUAL</Text>
        </TouchableOpacity>
      </CentredWrapper>
    </RootWrapper>
  );
}

export default PayMonthlyFee;
