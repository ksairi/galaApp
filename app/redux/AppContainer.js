import React from "react";
import { NetInfo, AppState, Platform, Vibration } from "react-native";
import StatusBar from "/components/presentationals/StatusBar";
import { Notifications } from "expo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	Screens,
	AnalitycsEventsLabels,
	Notifications as NotificationsData
} from "/config/settings";
import { ActionsCreators } from "./actions";
import AppRoutes from "/navigation/";
import NetworkHelper from "/helpers/NetworkHelper";
import { saveMessagesToDevice } from "/helpers/StoreHelper";
import createNotificationsHanlder from "./lib/createHandler";
import RootView from "/components/containers/RootView";
import {
	setNotifiedMessagesSaved
} from "/helpers/ApiHelper";
import { sendUnsentMessages } from "/helpers/MessagesHelper";
import {
	uploadProfilePicture,
	synchMemberProperties
} from "/helpers/UserDataHelper";
import AnalyticsHelper from "/helpers/AnalyticsHelper";

@connect(
	state => ({
		userId: state.userData.userId,
		newMemberData: state.newMemberData,
		messages: state.messages,
		currentHomeDrawerOption: state.currentHomeDrawerOption,
		isLoggedIn: state.isLoggedIn,
		isAppsFirstTime: state.isAppsFirstTime,
		messages: state.messages,
		profilePicture: state.profilePicture,
		receiveNotifications: state.receiveNotifications,
		orientation: state.currentOrientation
	}),
	dispatch =>
		Object.assign(
			{},
			{ dispatch },
			bindActionCreators(ActionsCreators, dispatch)
		)
)
export default class AppContainer extends React.Component {
	static alreadySetMessagesSaved = false;

	componentDidMount() {
		this.notificationSubscription = Notifications.addListener(
			this.handleNotification
		);
		NetInfo.addEventListener("connectionChange", this.handleConnectivityChange);
	}

	componentWillUnmount() {
		this.notificationSubscription.remove();

		NetInfo.removeEventListener(
			"connectionChange",
			this.handleConnectivityChange
		);
	}

	handleNotification = notification => {
		var localNotificationBody = "";
		const props = this.props;
		if (notification.origin === "received") {
			AnalyticsHelper.setEvent(
				`${AnalitycsEventsLabels.notificationReceivedOf} ${
					AnalitycsEventsLabels[
						Object.keys(notification.data).filter(
							key => key != NotificationsData.idFieldName
						)
					]
				}`
			);
			createNotificationsHanlder({
				messages() {
					saveMessagesToDevice(
						notification.data.messages,
						null,
						props.dispatch
					);
					props.dispatch(
						ActionsCreators.setNewMessagesCount(
							notification.data.messages.length
						)
					);
					setNotifiedMessagesSaved({
						userId: props.userId,
						notificationId: notification.data.notificationId,
						lastMessageIndex:
							notification.data.messages[notification.data.messages.length - 1]
								.index
					});
					AppContainer.alreadySetMessagesSaved = true;
					localNotificationBody = "Tenés nuevos mensajes!";
				}
			})(notification.data);
		}

		if (notification.origin === "selected") {
			const navigator = this.navigator;
			createNotificationsHanlder({
				messages() {
					if (!AppContainer.alreadySetMessagesSaved) {
						AnalyticsHelper.setEvent(
							`${AnalitycsEventsLabels.notificationReceivedOf} ${
								AnalitycsEventsLabels.messages
							}`
						);
						saveMessagesToDevice(
							notification.data.messages,
							null,
							props.dispatch
						);

						props.dispatch(
							ActionsCreators.setNewMessagesCount(
								notification.data.messages.length
							)
						);

						setNotifiedMessagesSaved({
							userId: props.userId,
							notificationId: notification.data.notificationId,
							lastMessageIndex:
								notification.data.messages[
									notification.data.messages.length - 1
								].index
						});
					}
				}
			})(notification.data);
			if (props.isLoggedIn) {
				const section =
					Object.keys(notification.data)[0]
						.charAt(0)
						.toUpperCase() + Object.keys(notification.data)[0].slice(1);
					navigator.navigate(section);
			} else {
				navigator.navigate(Screens.LoginStack);
			}
		}
		if (
			props.isLoggedIn &&
			Platform.OS == "ios" &&
			AppState.currentState === "active" &&
			notification.origin === "received"
		) {
			//remote notifications are not shown when app is active in iOS
			this.props.dispatch(
				ActionsCreators.setNotificationsText(localNotificationBody)
			);
			Vibration.vibrate();
		}
	};

	handleConnectivityChange = connectionInfo => {
		if (NetworkHelper.isDeviceConnected(connectionInfo)) {
			if (this.props.isLoggedIn) {
				this.props.dispatch(ActionsCreators.fetchUserStore());
				sendUnsentMessages(
					this.props.userId,
					this.props.messages,
					this.props.dispatch
				);
				if (this.props.profilePicture && !this.props.profilePicture.synched)
					uploadProfilePicture(this.props.dispatch, {
						userId: this.props.userId,
						path: this.props.profilePicture.path
					});
				synchMemberProperties(this.props.dispatch, {
					userId: this.props.userId,
					data: { receiveNotifications: this.props.receiveNotifications }
				});
			}
		}
	};

	render() {
		return (
			<RootView>
				<StatusBar
					backgroundColor="#5E8D48"
					barStyle="light-content"
					hidden={Platform.OS == "ios" && this.props.orientation == "landscape"}
				/>
				<AppRoutes
					ref={nav => {
						this.navigator = nav ? nav._navigation : nav;
					}}
				/>
			</RootView>
		);
	}
}
