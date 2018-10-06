import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Screens } from "/config/settings";
import { login } from "/helpers/LoginHelper";
import { ActionsCreators } from "/redux/actions";
import { getDeviceId } from "/helpers/NotificationsHelper";
import AnalyticsHelper from "/helpers/AnalyticsHelper";
import { Messages } from "/config/settings";
import { Text } from "react-native-animatable-promise";
import { genericBackgroundColor } from "/components/styles";

const styles = {
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: genericBackgroundColor
	}
};

@connect(state => ({
	isAppsFirstTime: state.isAppsFirstTime,
	isLoggedIn: state.isLoggedIn,
	userId: state.userData.userId,
	password: state.userData.password,
	loginSynchedDataParameters: state.loginSynchedDataParameters,
	deviceId: state.deviceId,
	messages: state.messages,
	hasResetFirstPassword: state.hasResetFirstPassword
}))
export default class CheckUserActivity extends React.Component {
	static isInLoggingProcess = false;

	constructor(props) {
		super(props);
		this.checkUserStatus();
	}
	componentDidMount() {
		AnalyticsHelper.setPageHit(Screens.CheckUserActivity);
	}

	checkUserStatus = async () => {
		if (this.props.isAppsFirstTime) {
			this.props.navigation.navigate(Screens.Welcome);
		} else {
			if (this.props.isLoggedIn) {
				try {
					CheckUserActivity.isInLoggingProcess = true;
					const deviceId = this.props.deviceId
						? this.props.deviceId
						: await getDeviceId(this.props.dispatch);
					await login(
						this.props.userId,
						this.props.password,
						deviceId,
						this.props.loginSynchedDataParameters,
						this.props.messages,
						this.props.dispatch
					);
					setTimeout(() => {
						if (this.props.hasResetFirstPassword) {
							this.props.navigation.navigate(Screens.HomeStack);
						} else {
							this.props.dispatch(
								ActionsCreators.setInResetFirstPasswordMode(true)
							);
							this.props.navigation.navigate(Screens.ResetPassword);
						}
					}, 4000);
				} catch (error) {
					if (Messages.CHECK_INTERNET_CONNECTION == error) {
						//offline login
						this.props.navigation.navigate(Screens.HomeStack);
					} else {
						this.props.dispatch(
							ActionsCreators.setAutoLoginErrorMessage(error)
						);
						this.props.navigation.navigate(Screens.LoginStack);
					}
				}
			} else {
				this.props.navigation.navigate(Screens.LoginStack);
			}
		}
	};

	render() {
		return (
			<View style={styles.container}>
				{CheckUserActivity.isInLoggingProcess && (
					<Text
						useNativeDriver={true}
						animation="pulse"
						duration={1500}
						iterationCount="infinite"
						style={{
							fontFamily: "lato-bold",
							fontSize: 30,
							color: "white"
						}}>
						Loguiandote...
					</Text>
				)}
			</View>
		);
	}
}
