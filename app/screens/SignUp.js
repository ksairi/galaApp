import React from "react";
import { Keyboard, KeyboardAvoidingView, View, Platform } from "react-native";
import { connect } from "react-redux";
import { Messages, Screens } from "/config/settings";
import { register } from "/helpers/LoginHelper";
import ValidationHelper from "/helpers/ValidationHelper";
import { getDeviceId } from "/helpers/NotificationsHelper";
import { RkTheme, RkTextInput } from "react-native-ui-kitten";
import RootWrapper from "/components/presentationals/RootWrapper";
import CentredWrapper from "/components/presentationals/CentredWrapper";
import Button from "/components/presentationals/GenericButton";
import GenericText from "/components/presentationals/GenericText";
import GenericLink from "/components/presentationals/GenericLink";
import LoadingSpinner from "/components/presentationals/LoadingSpinner";
import {
	genericTextInputStyle,
	textWithLinkStyle,
	containerPadding
} from "/components/styles";
import Header from "/components/containers/Header";

RkTheme.setType("RkTextInput", "inputText", genericTextInputStyle);

const styles = {
	registerAccountTitle: {
		fontSize: 16,
		fontFamily: "brother-1816-bold"
	},
	hiddenKeyboardComponentsStyle: {
		buttonContainerStyle: { flex: 1 },
		buttonStyle: { height: 40 },
		memeberAlreadyStyle: { flex: 0.4 }
	},
	showingKeyboardComponentsStyle: {
		textInputStyle: { marginTop: 0, marginBottom: 3, flex: 0.15 },
		titleStyle: { flex: 0.15 },
		buttonContainerStyle: { flex: 0.17 },
		buttonStyle: { height: 30 },
		buttonContentStyle: { fontSize: 14 },
		memeberAlreadyStyle: { flex: 0.6 },
		confirmPassInputStyle: { marginBottom: 0 }
	}
};

@connect(state => ({
	deviceId: state.deviceId,
	loginSynchedDataParameters: state.loginSynchedDataParameters
}))
export default class SignUp extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		header: <Header navigation={navigation} backScreen={Screens.SignIn} />
	});

	state = {
		errorMessage: "",
		focusPassword: false,
		spinnerVisible: false,
		componentsStyle: styles.hiddenKeyboardComponentsStyle
	};

	componentDidMount() {
		if (Platform.OS === "ios") {
			Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
		}
		this.keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			this._keyboardDidShow
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			this._keyboardDidHide
		);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	_keyboardDidShow = () => {
		this.setState({
			componentsStyle: styles.showingKeyboardComponentsStyle
		});
	};

	_keyboardDidHide = () => {
		if (this) {
			this.setState({ componentsStyle: styles.hiddenKeyboardComponentsStyle });
		}
	};

	signUp = async () => {
		Keyboard.dismiss();
		var errorMessage;

		if (!this.userFullName || !this.userId || !this.password) {
			this.setState({ errorMessage: Messages.INCOMPLETE_INPUT_DATA });
			return;
		}

		errorMessage = ValidationHelper.userIdWithErrors(this.userId);
		if (errorMessage) {
			this.setState({ errorMessage });
			return;
		}

		errorMessage = ValidationHelper.passwordsWithErrors(
			this.password,
			this.confirmPassword
		);
		if (errorMessage) {
			this.setState({ errorMessage });
			return;
		}

		this.setState({ errorMessage: "", spinnerVisible: true });
		try {
			const deviceId = this.props.deviceId
				? this.props.deviceId
				: await getDeviceId(this.props.dispatch);
			await register(
				this.userFullName,
				this.userId,
				this.password,
				deviceId,
				this.props.loginSynchedDataParameters,
				this.props.dispatch
			);
			this.setState({ spinnerVisible: false });
			this.props.navigation.navigate(Screens.HomeStack);
		} catch (errorMessage) {
			this.setState({ spinnerVisible: false, errorMessage });
		}
	};

	onSubmitUserFullName = () => {
		if (!this.userId) {
			this.refs.userIdInput._focusInput();
		} else {
			this.signUp();
		}
	};

	onSubmitUserId = () => {
		if (!this.password) {
			this.refs.passwordInput._focusInput();
		} else {
			this.signUp();
		}
	};

	onSubmitPassword = () => {
		if (!this.confirmPassword) {
			this.refs.confirmPasswordInput._focusInput();
		} else {
			this.signUp();
		}
	};
	goToSignIn = () => {
		this.props.navigation.navigate(Screens.SignIn);
	};

	onFullNameChangeText = fullName => {
		this.userFullName = fullName;
	};

	onUserIdChangeText = userId => {
		this.userId = userId;
	};

	onPasswordChangeText = password => {
		this.password = password;
	};

	onConfirmPasswordChangeText = password => {
		this.confirmPassword = password;
	};

	onInputTextOnFocus = () => {
		this.setState({
			errorMessage: ""
		});
	};

	render() {
		return (
			<RootWrapper style={{ paddingBottom: 0 }}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
					<CentredWrapper>
						<GenericText
							style={[
								styles.registerAccountTitle,
								this.state.componentsStyle.titleStyle
							]}>
							REGISTRAR CUENTA
						</GenericText>
						<RkTextInput
							rkType="rounded inputText"
							style={this.state.componentsStyle.textInputStyle}
							placeholder="Nombre"
							autoFocus
							returnKeyType="next"
							keyboardType="default"
							autoCapitalize="words"
							autoCorrect={false}
							onChangeText={this.onFullNameChangeText}
							onSubmitEditing={this.onSubmitUserFullName}
							onFocus={this.onInputTextOnFocus}
						/>

						<RkTextInput
							rkType="rounded inputText"
							style={this.state.componentsStyle.textInputStyle}
							placeholder="DNI"
							returnKeyType="next"
							keyboardType="numeric"
							autoCorrect={false}
							ref="userIdInput"
							onChangeText={this.onUserIdChangeText}
							onSubmitEditing={this.onSubmitUserId}
							onFocus={this.onInputTextOnFocus}
						/>

						<RkTextInput
							rkType="rounded inputText"
							style={this.state.componentsStyle.textInputStyle}
							placeholder="Contraseña"
							secureTextEntry
							autoCapitalize="none"
							autoCorrect={false}
							returnKeyType="next"
							keyboardType="default"
							ref="passwordInput"
							onChangeText={this.onPasswordChangeText}
							onSubmitEditing={this.onSubmitPassword}
							onFocus={this.onInputTextOnFocus}
						/>

						<RkTextInput
							rkType="rounded inputText"
							style={[
								this.state.componentsStyle.textInputStyle,
								this.state.componentsStyle.confirmPassInputStyle
							]}
							placeholder="Confirmar Contraseña"
							secureTextEntry
							autoCapitalize="none"
							autoCorrect={false}
							returnKeyType="done"
							keyboardType="default"
							ref="confirmPasswordInput"
							onChangeText={this.onConfirmPasswordChangeText}
							onSubmitEditing={this.signUp}
							onFocus={this.onInputTextOnFocus}
						/>

						<View
							style={[
								{ flexDirection: "row" },
								this.state.componentsStyle.buttonContainerStyle
							]}>
							<Button
								style={this.state.componentsStyle.buttonStyle}
								contentStyle={this.state.componentsStyle.buttonContentStyle}
								text="REGISTRARME"
								onPress={this.signUp}
							/>
						</View>

						<View
							style={[
								textWithLinkStyle.container,
								this.state.componentsStyle.memeberAlreadyStyle
							]}>
							<GenericText style={textWithLinkStyle.text}>
								¿Ya tenés una cuenta?
							</GenericText>
							<GenericLink
								containerStyle={textWithLinkStyle.link.container}
								contentStyle={textWithLinkStyle.link.content}
								onPress={this.goToSignIn}>
								Iniciá Sesión
							</GenericLink>
						</View>

						{this.state.errorMessage != "" && (
							<GenericText
								style={{
									fontSize: 13,
									paddingLeft: containerPadding,
									paddingRight: containerPadding
								}}
								error={this.state.errorMessage ? true : false}>
								{this.state.errorMessage}
							</GenericText>
						)}

						<LoadingSpinner visible={this.state.spinnerVisible} />
					</CentredWrapper>
				</KeyboardAvoidingView>
			</RootWrapper>
		);
	}
}
