import React from "react";
import {Keyboard} from "react-native";
import {createDrawerNavigator, createStackNavigator} from "react-navigation";
import {Screens} from "config/settings";
import Home from "screens/Home";
import Profile from "screens/Profile";
import Timetable from "screens/Timetable";
import Routines from "screens/Routines";
import RoutineDetail from "screens/RoutineDetail";
import Messages from "screens/Messages";
import Referrals from "screens/Referrals";
import CameraView from "screens/CameraView";
// import NewMember from 'screens/NewMember'
import LiveClass from "screens/LiveClass";
import RecordedClassesByClass from "screens/RecordedClassesByClass";
import BookedClasses from "screens/BookedClasses";
import Affidavit from "screens/Affidavit";
import ClassesToBook from "screens/ClassesToBook";
import DrawerContentComponent from "components/containers/DrawerContentComponent";
import Header from "components/containers/Header";

const HomeNavigator = createStackNavigator(
  {[Screens.Home]: {screen: Home}},
  {
    navigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation} isHomeHeader />,
    }),
  }
);

const BookedClassesNavigator = createStackNavigator(
  {[Screens.BookedClasses]: {screen: BookedClasses}},
  {
    navigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation} isHomeHeader />,
    }),
  }
);

const AffidavitNavigator = createStackNavigator(
  {
    [Screens.Affidavit]: {screen: Affidavit},
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

const ClassesToBookNavigator = createStackNavigator(
  {
    [Screens.ClassesToBook]: {screen: ClassesToBook},
  },
  {
    navigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation} backScreen={Screens.Home} />,
    }),
  }
);

// const NewMemberNavigator = createStackNavigator({
//   [Screens.NewMember]: { screen: NewMember }
// },
//   {
//     navigationOptions: ({ navigation }) => ({
//       header: <Header navigation={navigation} isHomeHeader />
//     })
//   }
// )

const ProfileNavigator = createStackNavigator(
  {
    [Screens.Profile]: {screen: Profile},
  },
  {
    navigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation} isHomeHeader />,
    }),
  }
);

const RecordedClassesByClassNavigator = createStackNavigator(
  {
    [Screens.RecordedClassesByClass]: {screen: RecordedClassesByClass},
  },
  {
    navigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation} isHomeHeader />,
    }),
  }
);

const RoutinesNavigator = createStackNavigator(
  {
    [Screens.Routines]: {screen: Routines},
  },
  {
    navigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation} isHomeHeader />,
    }),
  }
);

const RoutineDetailNavigator = createStackNavigator(
  {
    [Screens.RoutineDetail]: {screen: RoutineDetail},
  },
  {
    navigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation} isHomeHeader />,
    }),
  }
);

const TimetableNavigator = createStackNavigator(
  {
    [Screens.Timetable]: {screen: Timetable},
  },
  {
    navigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation} isHomeHeader />,
    }),
  }
);

const MessagesNavigator = createStackNavigator(
  {
    [Screens.Messages]: {screen: Messages},
  },
  {
    navigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation} isHomeHeader />,
    }),
  }
);

const ReferralsNavigator = createStackNavigator(
  {
    [Screens.Referrals]: {screen: Referrals},
  },
  {
    navigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation} isHomeHeader />,
    }),
  }
);

const drawerNavigator = createDrawerNavigator(
  {
    [Screens.Home]: {screen: HomeNavigator},
    [Screens.LiveClassStudio1]: {screen: LiveClass},
    [Screens.LiveClassStudio2]: {screen: LiveClass},
    [Screens.BookedClasses]: {screen: BookedClassesNavigator},
    [Screens.Affidavit]: {screen: AffidavitNavigator},
    [Screens.ClassesToBook]: {screen: ClassesToBookNavigator},
    [Screens.RecordedClassesByClass]: {screen: RecordedClassesByClassNavigator},
    // [Screens.NewMember]: { screen: NewMemberNavigator },
    [Screens.Profile]: {screen: ProfileNavigator},
    [Screens.Routines]: {screen: RoutinesNavigator},
    [Screens.RoutineDetail]: {screen: RoutineDetailNavigator},
    [Screens.CameraView]: {screen: CameraView},
    [Screens.Classes]: {screen: TimetableNavigator},
    [Screens.Timetable]: {screen: TimetableNavigator},
    [Screens.Messages]: {screen: MessagesNavigator},
    [Screens.Referrals]: {screen: ReferralsNavigator},
  },
  {
    contentComponent: (props) => (
      <DrawerContentComponent
        navigation={props.navigation}
        activeItemKey={props.activeItemKey}
      />
    ),
    backBehavior: "initialRoute",
  }
);

const defaultGetStateForAction = drawerNavigator.router.getStateForAction;

drawerNavigator.router.getStateForAction = (action, state) => {
  if (state && action.type === "Navigation/DRAWER_OPENED") {
    Keyboard.dismiss();
  }
  return defaultGetStateForAction(action, state);
};

export default drawerNavigator;
