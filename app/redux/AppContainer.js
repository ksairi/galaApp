import React from "react";
import { NetInfo } from "react-native";
import { Notifications } from "expo";
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
@connect(
	state => ({
		userData: state.userData,
		newMemberData: state.newMemberData,
		messages: state.messages,
		currentHomeDrawerOption: state.currentHomeDrawerOption,
		isLoggedIn: state.isLoggedIn,
		isAppsFirstTime: state.isAppsFirstTime,
		messages: state.messages
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
		const props = this.props;
		if (notification.origin === "received") {
			createNotificationsHanlder({
				promotions() {
					savePromotionsData(notification.data.promotions, props.dispatch);
					setNotifiedPromotionsSaved({
						userId: props.userData.userId,
						notificationId: notification.data.notificationId
					});
					AppContainer.alreadySetPromotionsSaved = true;
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
						userId: props.userData.userId,
						notificationId: notification.data.notificationId
					});
					AppContainer.alreadySetMessagesSaved = true;
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
							userId: props.userData.userId,
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
			if (this.props.isLoggedIn) {
				this.props.dispatch(ActionsCreators.fetchUserStore());
				sendUnsentMessages(
					this.props.userData.userId,
					this.props.messages,
					this.props.dispatch
				);
			}
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
}
