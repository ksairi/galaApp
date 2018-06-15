import React from "react";
import { NetInfo } from "react-native";
import { NavigationActions } from "react-navigation";
import { Notifications } from "expo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Screens } from "/config/settings";
import { ActionsCreators } from "./actions";
import AppRoutes from "/navigation/";
import ValidationHelper from "/helpers/ValidationHelper";
import NetworkHelper from "/helpers/NetworkHelper";
import { syncStoreWithServer } from "/helpers/StoreHelper";
import createNotificationsHanlder from "./lib/createHandler";
import RootView from "/components/containers/RootView";
@connect(
	state => ({
		userData: state.userData,
		newMemberData: state.newMemberData,
		notifications: state.notifications,
		currentHomeDrawerOption: state.currentHomeDrawerOption,
		isLoggedIn: state.isLoggedIn,
		isAppsFirstTime: state.isAppsFirstTime
	}),
	dispatch =>
		Object.assign(
			{},
			{ dispatch },
			bindActionCreators(ActionsCreators, dispatch)
		)
)
export default class AppContainer extends React.Component {
	static BATCH_PROCESS_INTERVAL = 300000;
	static intervalId;

	componentDidMount() {
		this.notificationSubscription = Notifications.addListener(
			this.handleNotification
		);

		NetInfo.addEventListener("connectionChange", this.handleConnectivityChange);

		this.startBatchProcess(); //to execute without delay
		AppContainer.intervalId = setInterval(
			this.startBatchProcess,
			AppContainer.BATCH_PROCESS_INTERVAL
		);
	}

	componentWillUnmount() {
		this.notificationSubscription.remove();

		NetInfo.removeEventListener(
			"connectionChange",
			this.handleConnectivityChange
		);
		clearInterval(AppContainer.intervalId);
	}

	handleNotification = async notification => {
		if (notification.origin === "received") {
			const props = this.props;
			createNotificationsHanlder({
				timetable() {
					props.setTimetable(notification.data.timetable);
				},
				routines() {
					props.setRoutines(notification.data.routines);
				},
				notifications() {
					props.setNotifications(notification.data.notifications);
				},
				notificationsNewMemberData() {
					if (props.newMemberData) {
						props.setNotificationsNewMemberData(
							notification.data.notificationsNewMemberData
						);
					}
				}
			})(notification.data);
		}

		if (notification.origin === "selected") {
			if (this.props.isLoggedIn) {
				const navigator = this.navigator;
				createNotificationsHanlder({
					timetable() {
						navigator.navigate(Screens.Timetable);
					},
					routines() {
						navigator.navigate(Screens.Routines);
					},
					notifications() {
						navigator.navigate(Screens.Notifications);
					}
				})(notification.data);
			} else {
				this.props.dispatch(
					ActionsCreators.setCurrentHomeDrawerOption(
						Object.keys(notification.data)[0]
							.charAt(0)
							.toUpperCase() + Object.keys(notification.data)[0].slice(1)
					)
				);
				navigator.navigate(Screens.LoginStack);
			}
		}
	};

	handleConnectivityChange = connectionInfo => {
		if (NetworkHelper.isDeviceConnected(connectionInfo)) {
			this.props.dispatch(ActionsCreators.setIsUsingCache(false));
			this.props.dispatch(ActionsCreators.fetchUserStore());
		} else {
			this.props.dispatch(ActionsCreators.setIsUsingCache(true));
		}
	};

	render() {
		return (
			<RootView>
				<AppRoutes
					ref={nav => {
						this.navigator = nav ? nav._navigation : nav;
					}}
				/>
			</RootView>
		);
	}

	startBatchProcess = () => {
		syncStoreWithServer(
			this.props.userData.userId,
			this.props.notifications,
			this.props.dispatch
		);
	};
}
