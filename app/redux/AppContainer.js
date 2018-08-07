import React from "react";
import { NetInfo } from "react-native";
import { Notifications } from "expo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Screens } from "/config/settings";
import { ActionsCreators } from "./actions";
import AppRoutes from "/navigation/";
import NetworkHelper from "/helpers/NetworkHelper";
import { syncStoreWithServer, savePromotionsData } from "/helpers/StoreHelper";
import createNotificationsHanlder from "./lib/createHandler";
import RootView from "/components/containers/RootView";
import { setNotifiedPromotionsSaved } from "/helpers/ApiHelper";
@connect(
	state => ({
		userData: state.userData,
		newMemberData: state.newMemberData,
		messages: state.messages,
		currentHomeDrawerOption: state.currentHomeDrawerOption,
		isLoggedIn: state.isLoggedIn,
		isAppsFirstTime: state.isAppsFirstTime,
		deviceId: state.deviceId
	}),
	dispatch =>
		Object.assign(
			{},
			{ dispatch },
			bindActionCreators(ActionsCreators, dispatch)
		)
)
export default class AppContainer extends React.Component {
	//static BATCH_PROCESS_INTERVAL = 300000;
	//static intervalId;
	static alreadySetPromotionsSaved = false;

	componentDidMount() {
		this.notificationSubscription = Notifications.addListener(
			this.handleNotification
		);

		NetInfo.addEventListener("connectionChange", this.handleConnectivityChange);

		//this.startBatchProcess(); //to execute without delay
		//AppContainer.intervalId = setInterval(
		//	this.startBatchProcess,
		//	AppContainer.BATCH_PROCESS_INTERVAL
		//);
	}

	componentWillUnmount() {
		this.notificationSubscription.remove();

		NetInfo.removeEventListener(
			"connectionChange",
			this.handleConnectivityChange
		);
		//clearInterval(AppContainer.intervalId);
	}

	handleNotification = async notification => {
		const props = this.props;
		if (notification.origin === "received") {
			createNotificationsHanlder({
				promotions() {
					savePromotionsData(notification.data.promotions, props.dispatch);
					setNotifiedPromotionsSaved({
						userId: props.userData.userId,
						deviceId: props.deviceId,
						notificationId: notification.data.notificationId
					});
					AppContainer.alreadySetPromotionsSaved = true;
				}
			})(notification.data);
		}

		if (notification.origin === "selected") {
			const navigator = this.navigator;
			createNotificationsHanlder({
				promotions() {
					savePromotionsData(notification.data.promotions, props.dispatch);
					if (!AppContainer.alreadySetPromotionsSaved) {
						setNotifiedPromotionsSaved({
							userId: props.userData.userId,
							deviceId: props.deviceId,
							notificationId: notification.data.notificationId
						});
					}
				}
			})(notification.data);
			if (props.isLoggedIn) {
				const section =
					Object.keys(notification.data)[0]
						.charAt(0)
						.toUpperCase() + Object.keys(notification.data)[0].slice(1);
				if (section == "Promotions") {
					navigator.navigate(Screens.Home);
				} else {
					navigator.navigate(section);
				}
			} else {
				navigator.navigate(Screens.LoginStack);
			}
		}
	};

	handleConnectivityChange = connectionInfo => {
		if (NetworkHelper.isDeviceConnected(connectionInfo)) {
			this.props.dispatch(ActionsCreators.fetchUserStore());
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
			this.props.messages,
			this.props.dispatch
		);
	};
}
