import React from "react";
import {createStackNavigator} from "react-navigation";
import {Screens} from "config/settings";
import Settings from "screens/Settings";
import Header from "components/containers/Header";
import VideoPlayer from "screens/VideoPlayer";
import RecordedClassesByDate from "screens/RecordedClassesByDate";
import RecordedClassesByTime from "screens/RecordedClassesByTime";
import AffidavitScreen from "screens/AffidavitScreen";
import PayMonthlyFee from "screens/PayMonthlyFee";
import DrawerStack from "./DrawerStack";

const SettingsNavigator = createStackNavigator(
  {
    [Screens.Settings]: {screen: Settings},
  },
  {
    navigationOptions: ({navigation}) => ({
      header: (
        <Header
          navigation={navigation}
          title="CONFIGURACIÓN"
          backScreen={Screens.Profile}
        />
      ),
    }),
  }
);

const RecordedClassesByDateNavigator = createStackNavigator(
  {
    [Screens.RecordedClassesByDate]: {screen: RecordedClassesByDate},
  },
  {
    navigationOptions: ({navigation}) => ({
      header: (
        <Header
          navigation={navigation}
          title={`CLASES DE ${navigation.state.params.name}`}
          backScreen={Screens.RecordedClassesByClass}
        />
      ),
    }),
  }
);

const RecordedClassesByTimeNavigator = createStackNavigator(
  {
    [Screens.RecordedClassesByTime]: {screen: RecordedClassesByTime},
  },
  {
    navigationOptions: ({navigation}) => ({
      header: (
        <Header
          navigation={navigation}
          title={`CLASES DE ${navigation.state.params.name}`}
          backScreen={Screens.RecordedClassesByDate}
        />
      ),
    }),
  }
);

const AffidavitScreenNavigator = createStackNavigator(
  {
    [Screens.AffidavitScreen]: {screen: AffidavitScreen},
  },
  {
    navigationOptions: ({navigation}) => ({
      header: (
        <Header
          navigation={navigation}
          title={"DECLARACIÓN JURADA"}
          backScreen={Screens.Home}
        />
      ),
    }),
  }
);

const PayMonthlyFeeScreenNavigator = createStackNavigator(
  {
    [Screens.PayMonthlyFee]: {screen: PayMonthlyFee},
  },
  {
    navigationOptions: ({navigation}) => ({
      header: (
        <Header navigation={navigation} title={""} backScreen={Screens.Home} />
      ),
    }),
  }
);

export default createStackNavigator(
  {
    DrawerStack: {screen: DrawerStack},
    [Screens.Settings]: {screen: SettingsNavigator},
    [Screens.VideoPlayer]: {screen: VideoPlayer},
    [Screens.RecordedClassesByDate]: {screen: RecordedClassesByDateNavigator},
    [Screens.RecordedClassesByTime]: {screen: RecordedClassesByTimeNavigator},
    [Screens.Affidavit]: {screen: AffidavitScreenNavigator},
    [Screens.PayMonthlyFee]: {screen: PayMonthlyFeeScreenNavigator},
  },
  {
    headerMode: "none",
  }
);
