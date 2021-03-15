import React from "react";
import {Platform} from "react-native";
import {WebView} from "react-native-webview";
import {WebView as WebViewWeb} from "react-native-web-webview";
import RootWrapper from "components/presentationals/RootWrapper";
import * as withEnv from "utils/env";
import {Screens} from "config/settings";
import {connect} from "react-redux";
import ActionsCreators from "redux/actions";

const PayVirtualMonthlyFee = ({navigation, dispatch}) => {
  const uri = `${withEnv.getHost()}/api/payments/mercado-pago/virtual-monthly-fee.php`;

  const handleWebViewNavigationStateChange = (newNavState) => {
    const {url} = newNavState;
    if (!url) return;

    if (url.includes("successful-payment.html")) {
      navigation.navigate(Screens.Home);
      dispatch(ActionsCreators.cleanFreePassEndDate());
      dispatch(ActionsCreators.setLastDateShowingFreePassEnding(null));
    }
  };
  return (
    <RootWrapper
      style={{
        justifyContent: "center",
        flex: 2,
        padding: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      {Platform.OS === "web" ? (
        <WebViewWeb source={{uri}} />
      ) : (
        <WebView
          allowsFullscreenVideo
          source={{uri}}
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      )}
    </RootWrapper>
  );
};
export default connect(() => ({}))(PayVirtualMonthlyFee);
