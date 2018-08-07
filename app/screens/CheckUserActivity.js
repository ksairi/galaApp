import React from "react";
import { View } from "react-native";
import LoadingSpinner from "/components/presentationals/LoadingSpinner";
import { connect } from "react-redux";
import { Screens } from "/config/settings";
import { login } from "/helpers/LoginHelper";
import { ActionsCreators } from "/redux/actions";
import { getDeviceId } from "/helpers/NotificationsHelper";

const styles = {
	container: {
		flex: 1,
		justifyContent: "center"
	},
	horizontal: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10
	}
};

@connect(state => ({
	isAppsFirstTime: state.isAppsFirstTime,
	isLoggedIn: state.isLoggedIn,
	userId: state.userData.userId,
	password: state.userData.password,
	loginSynchedDataParameters: state.loginSynchedDataParameters,
	deviceId: state.deviceId
}))
export default class CheckUserActivity extends React.Component {
	static isInLoggingProcess = false;

	constructor(props) {
		super(props);
		this.checkUserStatus();
	}

	async checkUserStatus() {
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
						this.props.dispatch
					);

					this.props.navigation.navigate(Screens.HomeStack);
				} catch (error) {
					this.props.dispatch(ActionsCreators.setAutoLoginErrorMessage(error));
					this.props.navigation.navigate(Screens.LoginStack);
				}
			} else {
				this.props.navigation.navigate(Screens.LoginStack);
			}
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{CheckUserActivity.isInLoggingProcess && (
					<LoadingSpinner visible={true} message={"Loguiando"} />
				)}
			</View>
		);
	}
}
