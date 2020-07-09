import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import SignIn from "screens/SignIn";
import SignUp from "screens/SignUp";
import ResetPassword from "screens//ResetPassword";
import {Screens} from "config/settings";
import Header from "components/containers/Header";

const Stack = createStackNavigator();

const SignUpNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.SignUp}
      component={SignUp}
      options={{
        header: ({navigation}) => (
          <Header {...{navigation}} backScreen={Screens.SignIn} />
        ),
      }}
    />
  </Stack.Navigator>
);

const ResetPasswordNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.ResetPassword}
      component={ResetPassword}
      options={{
        header: ({navigation}) => (
          <Header {...{navigation}} backScreen={Screens.SignIn} />
        ),
      }}
    />
  </Stack.Navigator>
);

export default () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={Screens.SignIn} component={SignIn} />
    <Stack.Screen name={Screens.SignUp}>{SignUpNavigator}</Stack.Screen>
    <Stack.Screen name={Screens.ResetPassword}>
      {ResetPasswordNavigator}
    </Stack.Screen>
  </Stack.Navigator>
);
