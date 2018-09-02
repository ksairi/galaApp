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
import { ActionsCreators } from "/redux/actions";
import { Screens } from "/config/settings";
import { synchMemberProperties } from "/helpers/UserDataHelper";
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
	receiveNotifications: state.receiveNotifications,
	userId: state.userData.userId
}))
export default class Settings extends React.Component {
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

	onValueChange = value => {
		const values = {
			value,
			synched: false
		};
		this.props.dispatch(ActionsCreators.setReceiveNotifications(values));

		synchMemberProperties(this.props.dispatch, {
			userId: this.props.userId,
			data: { receiveNotifications: values }
		});
	};

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
								value={
									this.props.receiveNotifications == null
										? true
										: this.props.receiveNotifications.value
								}
								tintColor="grey"
								onTintColor="white"
								thumbTintColor="white"
								onValueChange={value => {
									this.onValueChange(value);
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
