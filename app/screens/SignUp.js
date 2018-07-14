import React from "react";
import { Keyboard, KeyboardAvoidingView, View } from "react-native";
import { connect } from "react-redux";
import { Messages, Screens } from "/config/settings";
import { register } from "/helpers/LoginHelper";
import ValidationHelper from "/helpers/ValidationHelper";
import { getDeviceToken } from "/helpers/NotificationsHelper";
import { RkTheme, RkTextInput } from "react-native-ui-kitten";
import RootWrapper from "/components/presentationals/RootWrapper";
import CentredWrapper from "/components/presentationals/CentredWrapper";
import Button from "/components/presentationals/GenericButton";
import GenericText from "/components/presentationals/GenericText";
import GenericLink from "/components/presentationals/GenericLink";
import LoadingSpinner from "/components/presentationals/LoadingSpinner";
import { genericTextInputStyle, textWithLinkStyle } from "/components/styles";

RkTheme.setType("RkTextInput", "inputText", genericTextInputStyle);

const styles = {
	registerAccountTitle: {
		fontSize: 16,
		fontFamily: "brother-1816-bold"
	},
	hiddenKeyboardComponentsStyle: {
		rootWrapperStyle: { paddingTop: 15 },
		buttonContainerStyle: { flex: 1 },
		buttonContentStyle: { height: 40 }
	},
	showingKeyboardComponentsStyle: {
		textInputStyle: { marginTop: 0, marginBottom: 5, flex: 0.15 },
		titleStyle: { flex: 0.2 },
		rootWrapperStyle: { paddingTop: 10, paddingBottom: 5 },
		buttonContainerStyle: { flex: 0.2 },
		buttonContentStyle: { height: 30 },
		memeberAlreadyStyle: { flex: 0.6 }
	},
	landscapeComponentsStyle: {
		textInputStyle: { marginTop: 0 },
		buttonContentStyle: { height: 25 },
		memeberAlreadyStyle: { flex: 0.6 }
	}
};

@connect(state => ({
	notificationsToken: state.notificationsToken,
	orientation: state.currentOrientation,
	loginSynchedDataParameters: state.loginSynchedDataParameters
}))
export default class SignUp extends React.Component {
	state = {
		errorMessage: "",
		focusPassword: false,
		spinnerVisible: false,
		componentsStyle: styles.hiddenKeyboardComponentsStyle
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.orientation == "landscape") {
			return {
				componentsStyle: {
					...prevState.componentsStyle,
					...styles.landscapeComponentsStyle
				}
			};
		} else {
			return {
				componentsStyle: {
					...prevState.componentsStyle,
					...styles.hiddenKeyboardComponentsStyle
				}
			};
		}
	}

	componentDidMount() {
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
			componentsStyle: styles.showingKeyboardComponentsStyle,
			errorMessage: ""
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
			const deviceToken = this.props.notificationsToken
				? this.props.notificationsToken
				: await getDeviceToken(this.props.dispatch);
			await register(
				this.userFullName,
				this.userId,
				this.password,
				deviceToken,
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

	render() {
		return (
			<RootWrapper style={this.state.componentsStyle.rootWrapperStyle}>
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
						/>

						<RkTextInput
							rkType="rounded inputText"
							style={this.state.componentsStyle.textInputStyle}
							placeholder="Confirmar Contraseña"
							secureTextEntry
							autoCapitalize="none"
							autoCorrect={false}
							returnKeyType="done"
							keyboardType="default"
							ref="confirmPasswordInput"
							onChangeText={this.onConfirmPasswordChangeText}
							onSubmitEditing={this.signUp}
						/>

						<View
							style={[
								{ flexDirection: "row" },
								this.state.componentsStyle.buttonContainerStyle
							]}>
							<Button
								style={this.state.componentsStyle.buttonContentStyle}
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
								style={{ flex: 0.6 }}
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
