import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
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
import Affidavit from "screens/Affidavit";
import DrawerContentComponent from "components/containers/DrawerContentComponent";
import Header from "components/containers/Header";
import ClassesToBook from "screens/ClassesToBook";
import BookedClasses from "screens/BookedClasses";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.Home}
      component={Home}
      options={{
        header: ({navigation}) => <Header {...{navigation}} isHomeHeader />,
      }}
    />
  </Stack.Navigator>
);

const BookedClassesNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.BookedClasses}
      component={BookedClasses}
      options={{
        header: ({navigation}) => (
          <Header {...{navigation}} backScreen={Screens.Home} />
        ),
      }}
    />
  </Stack.Navigator>
);

const AffidavitNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.Affidavit}
      component={Affidavit}
      options={{
        header: ({navigation}) => (
          <Header
            {...{navigation}}
            title={"DECLARACIÓN JURADA"}
            backScreen={Screens.Home}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const ClassesToBookNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.ClassesToBook}
      component={ClassesToBook}
      options={{
        header: ({navigation}) => (
          <Header {...{navigation}} backScreen={Screens.Home} />
        ),
      }}
    />
  </Stack.Navigator>
);

// const NewMemberNavigator = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name={Screens.NewMember}
//       component={NewMember}
//       options={{
//         header: ({navigation}) => (
//           <Header {...{navigation}} backScreen={Screens.Home} />
//         ),
//       }}
//     />
//   </Stack.Navigator>
// );

const ProfileNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.Profile}
      component={Profile}
      options={{
        header: ({navigation}) => (
          <Header {...{navigation}} backScreen={Screens.Home} />
        ),
      }}
    />
  </Stack.Navigator>
);

const RecordedClassesByClassNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.RecordedClassesByClass}
      component={RecordedClassesByClass}
      options={{
        header: ({navigation}) => (
          <Header {...{navigation}} backScreen={Screens.Home} />
        ),
      }}
    />
  </Stack.Navigator>
);

const RoutinesNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.Routines}
      component={Routines}
      options={{
        header: ({navigation}) => (
          <Header {...{navigation}} backScreen={Screens.Home} />
        ),
      }}
    />
  </Stack.Navigator>
);

const RoutineDetailNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.RoutineDetail}
      component={RoutineDetail}
      options={{
        header: ({navigation}) => <Header {...{navigation}} />,
      }}
    />
  </Stack.Navigator>
);

const TimetableNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.Timetable}
      component={Timetable}
      options={{
        header: ({navigation}) => (
          <Header {...{navigation}} backScreen={Screens.Home} />
        ),
      }}
    />
  </Stack.Navigator>
);

const MessagesNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.Messages}
      component={Messages}
      options={{
        header: ({navigation}) => (
          <Header {...{navigation}} backScreen={Screens.Home} />
        ),
      }}
    />
  </Stack.Navigator>
);

const ReferralsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.Referrals}
      component={Referrals}
      options={{
        header: ({navigation}) => (
          <Header {...{navigation}} backScreen={Screens.Home} />
        ),
      }}
    />
  </Stack.Navigator>
);

const Drawer = createDrawerNavigator();
export default () => (
  <Drawer.Navigator
    initialRouteName="Home"
    backBehavior="initialRoute"
    drawerContent={(props) => (
      <DrawerContentComponent
        navigation={props.navigation}
        activeItemKey={props.activeItemKey}
      />
    )}
  >
    <Drawer.Screen name={Screens.Home}>{HomeNavigator}</Drawer.Screen>
    <Drawer.Screen name={Screens.LiveClassStudio1} component={LiveClass} />
    <Drawer.Screen name={Screens.LiveClassStudio2} component={LiveClass} />
    <Drawer.Screen name={Screens.Affidavit}>{AffidavitNavigator}</Drawer.Screen>
    <Drawer.Screen name={Screens.ClassesToBook}>
      {ClassesToBookNavigator}
    </Drawer.Screen>
    <Drawer.Screen name={Screens.BookedClasses}>
      {BookedClassesNavigator}
    </Drawer.Screen>
    <Drawer.Screen name={Screens.RecordedClassesByClass}>
      {RecordedClassesByClassNavigator}
    </Drawer.Screen>

    {/* <Drawer.Screen name={`${Screens.NewMember}`} component={NewMember} /> */}
    <Drawer.Screen name={Screens.Profile}>{ProfileNavigator}</Drawer.Screen>

    <Drawer.Screen name={Screens.Routines}>{RoutinesNavigator}</Drawer.Screen>
    <Drawer.Screen name={Screens.RoutineDetail}>
      {RoutineDetailNavigator}
    </Drawer.Screen>
    <Drawer.Screen name={Screens.CameraView} component={CameraView} />
    <Drawer.Screen name={Screens.Timetable}>{TimetableNavigator}</Drawer.Screen>
    <Drawer.Screen name={Screens.Messages}>{MessagesNavigator}</Drawer.Screen>
    <Drawer.Screen name={Screens.Referrals}>{ReferralsNavigator}</Drawer.Screen>
  </Drawer.Navigator>
);
