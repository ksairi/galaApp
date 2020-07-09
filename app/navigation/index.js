import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {Screens} from "config/settings";
import CheckUserActivityScreen from "screens/CheckUserActivity";
import WelcomeScreen from "screens/Welcome";
import LoginStack from "./login/LoginStack";
import HomeStack from "./home/HomeStack";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      headerMode="none"
      initialRouteName={Screens.CheckUserActivity}
    >
      <Stack.Screen name={`${Screens.Welcome}`} component={WelcomeScreen} />
      <Stack.Screen
        name={`${Screens.CheckUserActivity}`}
        component={CheckUserActivityScreen}
      />
      <Stack.Screen name={`${Screens.LoginStack}`} component={LoginStack} />
      <Stack.Screen name={`${Screens.HomeStack}`} component={HomeStack} />
    </Stack.Navigator>
  </NavigationContainer>
);
