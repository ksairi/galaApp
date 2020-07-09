import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Screens} from "config/settings";
import Settings from "screens/Settings";
import Header from "components/containers/Header";
import VideoPlayer from "screens/VideoPlayer";
import RecordedClassesByDate from "screens/RecordedClassesByDate";
import RecordedClassesByTime from "screens/RecordedClassesByTime";
import PayMonthlyFee from "screens/PayMonthlyFee";
import DrawerStack from "./DrawerStack";

const Stack = createStackNavigator();

const SettingsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.Settings}
      component={Settings}
      options={{
        header: ({navigation}) => (
          <Header
            {...{navigation}}
            title="CONFIGURACIÓN"
            backScreen={Screens.Profile}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const RecordedClassesByDateNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.RecordedClassesByDate}
      component={RecordedClassesByDate}
      options={{
        header: ({navigation}) => (
          <Header
            {...{navigation}}
            title={`CLASES DE ${navigation.state.params.name}`}
            backScreen={Screens.RecordedClassesByClass}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const RecordedClassesByTimeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.RecordedClassesByTime}
      component={RecordedClassesByTime}
      options={{
        header: ({navigation}) => (
          <Header
            {...{navigation}}
            title={`CLASES DE ${navigation.state.params.name}`}
            backScreen={Screens.RecordedClassesByDate}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const PayMonthlyFeeScreenNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.PayMonthlyFee}
      component={PayMonthlyFee}
      options={{
        header: ({navigation}) => (
          <Header {...{navigation}} backScreen={Screens.Home} />
        ),
      }}
    />
  </Stack.Navigator>
);

export default () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="DrawerStack" component={DrawerStack} />
    <Stack.Screen name={Screens.Settings}>{SettingsNavigator}</Stack.Screen>
    <Stack.Screen name={Screens.VideoPlayer} component={VideoPlayer} />
    <Stack.Screen name={Screens.RecordedClassesByDate}>
      {RecordedClassesByDateNavigator}
    </Stack.Screen>
    <Stack.Screen name={Screens.RecordedClassesByTime}>
      {RecordedClassesByTimeNavigator}
    </Stack.Screen>
    <Stack.Screen name={Screens.PayMonthlyFee}>
      {PayMonthlyFeeScreenNavigator}
    </Stack.Screen>
  </Stack.Navigator>
);
