import React from "react";
import {
	NetInfo,
	View,
	StatusBar,
	AppState,
	Platform,
	Vibration
} from "react-native";
import { Notifications, Constants } from "expo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Screens } from "/config/settings";
import { ActionsCreators } from "./actions";
import AppRoutes from "/navigation/";
import NetworkHelper from "/helpers/NetworkHelper";
import { savePromotionsData, saveMessagesToDevice } from "/helpers/StoreHelper";
import createNotificationsHanlder from "./lib/createHandler";
import RootView from "/components/containers/RootView";
import {
	setNotifiedPromotionsSaved,
	setNotifiedMessagesSaved
} from "/helpers/ApiHelper";
import { sendUnsentMessages } from "/helpers/MessagesHelper";
import {
	uploadProfilePicture,
	synchMemberProperties
} from "/helpers/UserDataHelper";

const MyStatusBar = ({ backgroundColor, ...props }) => (
	<View style={[{ height: Constants.statusBarHeight }, { backgroundColor }]}>
		<StatusBar translucent backgroundColor={backgroundColor} {...props} />
	</View>
);

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
		receiveNotifications: state.receiveNotifications
	}),
	dispatch =>
		Object.assign(
			{},
			{ dispatch },
			bindActionCreators(ActionsCreators, dispatch)
		)
)
export default class AppContainer extends React.Component {
	static alreadySetPromotionsSaved = false;
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

	handleNotification = async notification => {
		var localNotificationBody = "";
		const props = this.props;
		if (notification.origin === "received") {
			createNotificationsHanlder({
				promotions() {
					savePromotionsData(notification.data.promotions, props.dispatch);
					setNotifiedPromotionsSaved({
						userId: props.userId,
						notificationId: notification.data.notificationId
					});
					AppContainer.alreadySetPromotionsSaved = true;
					localNotificationBody =
						(localNotificationBody == "" ? "" : "\n") +
						"Hay nuevas promociones!";
				},
				messages() {
					saveMessagesToDevice(
						notification.data.messages,
						null,
						props.dispatch
					);
					props.dispatch(
						ActionsCreators.setNewMessagesCount(
							notification.data.messages.messages.length
						)
					);
					setNotifiedMessagesSaved({
						userId: props.userId,
						notificationId: notification.data.notificationId
					});
					AppContainer.alreadySetMessagesSaved = true;
					localNotificationBody =
						(localNotificationBody == "" ? "" : "\n") +
						"Tenés nuevos mensajes!";
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
							userId: props.userId,
							notificationId: notification.data.notificationId
						});
					}
				},
				messages() {
					if (!AppContainer.alreadySetMessagesSaved) {
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
				<MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
				<AppRoutes
					ref={nav => {
						this.navigator = nav ? nav._navigation : nav;
					}}
				/>
			</RootView>
		);
	}
}
