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
import Settings from "screens/Settings";
import VideoPlayer from "screens/VideoPlayer";
import RecordedClassesByDate from "screens/RecordedClassesByDate";
import RecordedClassesByTime from "screens/RecordedClassesByTime";
import PayMonthlyFee from "screens/PayMonthlyFee";
import PayVirtualMonthlyFee from "screens/PayVirtualMonthlyFee";
import PayFaceToFaceMonthlyFee from "screens/PayFaceToFaceMonthlyFee";

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
        header: ({navigation}) => <Header {...{navigation}} isHomeHeader />,
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
          <Header {...{navigation}} title={"DECLARACIÓN JURADA"} isHomeHeader />
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
        header: ({navigation}) => <Header {...{navigation}} isHomeHeader />,
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
//           <Header {...{navigation}}  />
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
        header: ({navigation}) => <Header {...{navigation}} isHomeHeader />,
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
        header: ({navigation}) => <Header {...{navigation}} isHomeHeader />,
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
        header: ({navigation}) => <Header {...{navigation}} isHomeHeader />,
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
        header: ({navigation}) => (
          <Header {...{navigation}} backScreen={Screens.Routines} />
        ),
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
        header: ({navigation}) => <Header {...{navigation}} isHomeHeader />,
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
        header: ({navigation}) => <Header {...{navigation}} isHomeHeader />,
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
        header: ({navigation}) => <Header {...{navigation}} isHomeHeader />,
      }}
    />
  </Stack.Navigator>
);

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
        header: ({navigation, route}) => (
          <Header
            {...{navigation}}
            title={`CLASES DE ${route.params?.name}`}
            backScreen={Screens.RecordedClassesByClass}
            backScreenParams={{loadClasses: false}}
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
        header: ({navigation, route}) => (
          <Header
            {...{navigation}}
            title={`CLASES DE ${route.params?.name}`}
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
          <Header
            {...{navigation}}
            isHomeHeader
            title={"PLANES ACTIVOS GALA"}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const PayVirtualMonthlyFeeScreenNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.PayVirtualMonthlyFee}
      component={PayVirtualMonthlyFee}
      options={{
        header: ({navigation}) => (
          <Header {...{navigation}} backScreen={Screens.PayMonthlyFee} />
        ),
      }}
    />
  </Stack.Navigator>
);

const PayFaceToFaceMonthlyFeeScreenNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={Screens.PayFaceToFaceMonthlyFee}
      component={PayFaceToFaceMonthlyFee}
      options={{
        header: (a) => {
          console.log("ksairi");
          console.log(a);
          return <Header backScreen={Screens.PayMonthlyFee} />;
        },
      }}
    />
  </Stack.Navigator>
);

const hiderHeader = {
  options: {
    headerShown: false,
  },
};
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
    <Drawer.Screen {...hiderHeader} name={Screens.Home}>
      {HomeNavigator}
    </Drawer.Screen>
    <Drawer.Screen
      {...hiderHeader}
      name={Screens.LiveClassStudio1}
      component={LiveClass}
    />
    <Drawer.Screen
      {...hiderHeader}
      name={Screens.LiveClassStudio2}
      component={LiveClass}
    />
    <Drawer.Screen {...hiderHeader} name={Screens.Affidavit}>
      {AffidavitNavigator}
    </Drawer.Screen>
    <Drawer.Screen {...hiderHeader} name={Screens.ClassesToBook}>
      {ClassesToBookNavigator}
    </Drawer.Screen>
    <Drawer.Screen {...hiderHeader} name={Screens.BookedClasses}>
      {BookedClassesNavigator}
    </Drawer.Screen>
    <Drawer.Screen {...hiderHeader} name={Screens.RecordedClassesByClass}>
      {RecordedClassesByClassNavigator}
    </Drawer.Screen>
    <Stack.Screen {...hiderHeader} name={Screens.RecordedClassesByDate}>
      {RecordedClassesByDateNavigator}
    </Stack.Screen>
    <Stack.Screen {...hiderHeader} name={Screens.RecordedClassesByTime}>
      {RecordedClassesByTimeNavigator}
    </Stack.Screen>
    {/* <Drawer.Screen {...hiderHeader} name={`${Screens.NewMember}`} component={NewMember} /> */}
    <Drawer.Screen {...hiderHeader} name={Screens.Profile}>
      {ProfileNavigator}
    </Drawer.Screen>
    <Drawer.Screen {...hiderHeader} name={Screens.Routines}>
      {RoutinesNavigator}
    </Drawer.Screen>
    <Drawer.Screen {...hiderHeader} name={Screens.RoutineDetail}>
      {RoutineDetailNavigator}
    </Drawer.Screen>
    <Drawer.Screen
      {...hiderHeader}
      name={Screens.CameraView}
      component={CameraView}
    />
    <Drawer.Screen {...hiderHeader} name={Screens.Timetable}>
      {TimetableNavigator}
    </Drawer.Screen>
    <Drawer.Screen {...hiderHeader} name={Screens.Messages}>
      {MessagesNavigator}
    </Drawer.Screen>
    <Drawer.Screen {...hiderHeader} name={Screens.Referrals}>
      {ReferralsNavigator}
    </Drawer.Screen>
    <Stack.Screen {...hiderHeader} name={Screens.Settings}>
      {SettingsNavigator}
    </Stack.Screen>
    <Stack.Screen
      {...hiderHeader}
      name={Screens.VideoPlayer}
      component={VideoPlayer}
    />

    <Stack.Screen {...hiderHeader} name={Screens.PayMonthlyFee}>
      {PayMonthlyFeeScreenNavigator}
    </Stack.Screen>
    <Stack.Screen {...hiderHeader} name={Screens.PayVirtualMonthlyFee}>
      {PayVirtualMonthlyFeeScreenNavigator}
    </Stack.Screen>
    <Stack.Screen {...hiderHeader} name={Screens.PayFaceToFaceMonthlyFee}>
      {PayFaceToFaceMonthlyFeeScreenNavigator}
    </Stack.Screen>
  </Drawer.Navigator>
);
