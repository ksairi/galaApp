import React from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { Screens } from "/config/settings";
import Home from "/screens/Home";
import Profile from "/screens/Profile";
import Timetable from "/screens/Timetable";
import Routines from "/screens/Routines";
import RoutineDetail from "/screens/RoutineDetail";
import Messages from "/screens/Messages";
import Referrals from "/screens/Referrals";
import CameraView from "/screens/CameraView";
import DrawerContentComponent from "/components/presentationals/DrawerContentComponent";
import Header from "/components/containers/Header";

const HomeNavigator = createStackNavigator(
	{
		[Screens.Home]: { screen: Home }
	},
	{
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} isHomeHeader />
		})
	}
);

const ProfileNavigator = createStackNavigator(
	{
		[Screens.Profile]: { screen: Profile }
	},
	{
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} isHomeHeader />
		})
	}
);

const RoutinesNavigator = createStackNavigator(
	{
		[Screens.Routines]: { screen: Routines }
	},
	{
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} isHomeHeader />
		})
	}
);

const RoutineDetailNavigator = createStackNavigator(
	{
		[Screens.RoutineDetail]: { screen: RoutineDetail }
	},
	{
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} isHomeHeader />
		})
	}
);

const TimetableNavigator = createStackNavigator(
	{
		[Screens.Timetable]: { screen: Timetable }
	},
	{
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} isHomeHeader />
		})
	}
);

const MessagesNavigator = createStackNavigator(
	{
		[Screens.Messages]: { screen: Messages }
	},
	{
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} isHomeHeader />
		})
	}
);

const ReferralsNavigator = createStackNavigator(
	{
		[Screens.Referrals]: { screen: Referrals }
	},
	{
		navigationOptions: ({ navigation }) => ({
			header: <Header navigation={navigation} isHomeHeader />
		})
	}
);

export default createDrawerNavigator(
	{
		[Screens.Home]: { screen: HomeNavigator },
		[Screens.Profile]: { screen: ProfileNavigator },
		[Screens.Routines]: { screen: RoutinesNavigator },
		[Screens.RoutineDetail]: { screen: RoutineDetailNavigator },
		[Screens.CameraView]: { screen: CameraView },
		[Screens.Classes]: { screen: TimetableNavigator },
		[Screens.Timetable]: { screen: TimetableNavigator },
		[Screens.Messages]: { screen: MessagesNavigator },
		[Screens.Referrals]: { screen: ReferralsNavigator }
	},
	{
		contentComponent: props => (
			<DrawerContentComponent
				navigation={props.navigation}
				activeItemKey={props.activeItemKey}
			/>
		)
	}
);
