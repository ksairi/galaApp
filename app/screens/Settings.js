import React from "react";
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	Switch,
	Alert
} from "react-native";
import { connect } from "react-redux";
import RootWrapper from "/components/presentationals/RootWrapper";
import { ActionsCreators } from "/redux/actions/";
import { Screens } from "/config/settings";

const styles = {
	title: {
		fontFamily: "lato-regular",
		fontSize: 20,
		flex: 0.1,
		color: "white"
	},
	settingsWrapper: { flex: 0.4 },
	settingItem: {
		flexDirection: "row",
		marginTop: 5,
		marginBottom: 5
	},
	settingText: {
		fontFamily: "lato-regular",
		fontSize: 18,
		alignSelf: "flex-start",
		color: "white",
		flex: 1
	}
};

@connect(state => ({
	userData: state.userData
}))
export default class Settings extends React.Component {
	state = {
		receivePushNotifications:
			this.props.userData.receiveNotifications == null
				? true
				: this.props.userData.receiveNotifications
	};

	logout = () => {
		Alert.alert(
			"",
			"¿Cerrar sesión?",
			[
				{ text: "No", style: "cancel" },
				{
					text: "Sí",
					onPress: () => {
						this.props.navigation.navigate(Screens.LoginStack);
						this.props.dispatch(ActionsCreators.logout());
					}
				}
			],
			{ cancelable: true }
		);
	};
	componentWillUnmount() {
		this.props.dispatch(
			ActionsCreators.setReceiveNotifications(
				this.state.receivePushNotifications
			)
		);
	}
	render() {
		return (
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1
				}}>
				<RootWrapper>
					<Text style={styles.title}>CONFIGURACIÓN DE PERFIL</Text>
					<View style={styles.settingsWrapper}>
						<View style={styles.settingItem}>
							<Text style={styles.settingText}>Recibir Notificaciones</Text>
							<Switch
								style={{ alignSelf: "flex-end" }}
								value={this.state.receivePushNotifications}
								tintColor="grey"
								onTintColor="white"
								thumbTintColor="white"
								onValueChange={value => {
									this.setState({ receivePushNotifications: value });
								}}
							/>
						</View>
						<TouchableOpacity style={styles.settingItem} onPress={this.logout}>
							<Text style={styles.settingText}>Cerrar Sesión</Text>
						</TouchableOpacity>
					</View>
				</RootWrapper>
			</ScrollView>
		);
	}
}
