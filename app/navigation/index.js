import React, {useEffect} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {Screens} from "config/settings";
import CheckUserActivityScreen from "screens/CheckUserActivity";
import WelcomeScreen from "screens/Welcome";
import LoginStack from "./login/LoginStack";
import HomeStack from "./home/HomeStack";
import ResetPassword from "screens/ResetPassword";
import {navigationRef, isReadyRef} from "./RootNavigation";
import {connect} from "react-redux";
import * as withEnv from "utils/env";

const Stack = createStackNavigator();

function AppRoutes({
  isInSession,
  isLoggedIn,
  hasResetFirstPassword,
  inResetFirstPasswordMode,
  isAppsFirstTime,
  goToMobileWebLogin,
}) {
  useEffect(() => {
    return () => (isReadyRef.current = false);
  }, []);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <Stack.Navigator headerMode="none">
        {isAppsFirstTime || (withEnv.isWebInMobile() && !goToMobileWebLogin) ? (
          <Stack.Screen name={Screens.Welcome} component={WelcomeScreen} />
        ) : isLoggedIn &&
          (!hasResetFirstPassword || inResetFirstPasswordMode) ? (
          <Stack.Screen
            name={Screens.ResetPassword}
            component={ResetPassword}
          />
        ) : isInSession ? (
          <Stack.Screen name={Screens.HomeStack} component={HomeStack} />
        ) : !isLoggedIn ? (
          <Stack.Screen name={Screens.LoginStack} component={LoginStack} />
        ) : (
          <Stack.Screen
            name={Screens.CheckUserActivity}
            component={CheckUserActivityScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default connect((state) => ({
  isInSession: state.isInSession,
  isLoggedIn: state.isLoggedIn,
  hasResetFirstPassword: state.hasResetFirstPassword,
  inResetFirstPasswordMode: state.inResetFirstPasswordMode,
  isAppsFirstTime: state.isAppsFirstTime,
  goToMobileWebLogin: state.goToMobileWebLogin,
}))(AppRoutes);
