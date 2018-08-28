import React from "react";
import {
	Keyboard,
	View,
	KeyboardAvoidingView,
	Image,
	Dimensions
} from "react-native";
import { connect } from "react-redux";
import { RkTheme, RkTextInput } from "react-native-ui-kitten";
import * as Animatable from "react-native-animatable-promise";
import { Messages, Screens } from "/config/settings";
import { login } from "/helpers/LoginHelper";
import RootWrapper from "/components/presentationals/RootWrapper";
import CentredWrapper from "/components/presentationals/CentredWrapper";
import Button from "/components/presentationals/GenericButton";
import GenericText from "/components/presentationals/GenericText";
import GenericLink from "/components/presentationals/GenericLink";
import LoadingSpinner from "/components/presentationals/LoadingSpinner";
import Logo from "/components/presentationals/Logo";
import {
	genericTextInputStyle,
	textWithLinkStyle,
	containerPadding
} from "/components/styles";
import { getDeviceId } from "/helpers/NotificationsHelper";

const AnimatedLogo = Animatable.createAnimatableComponent(Logo);
const AnimatedImage = Animatable.createAnimatableComponent(Image);

RkTheme.setType("RkTextInput", "inputText", genericTextInputStyle);

const styles = {
	animatedLogoInitStyle: { flex: 1, fontSize: 60 },
	animatedLogoEndStyle: { flex: 0.9, fontSize: 35 },
	animatedImageInitStyle: {
		flex: -1,
		height: 205,
		width: Dimensions.get("window").width,
		marginBottom: 10
	},
	animatedImageEndStyle: { height: 110, width: 193, marginBottom: 0 },
	rootWrapperStyle: { paddingTop: Expo.Constants.statusBarHeight + 10 },
	hiddenKeyboardComponentsStyle: {
		passwordInputStyle: { marginBottom: 10 },
		buttonContainerStyle: { flex: 0.7 },
		linksContainerStyle: { flex: 0.7 }
	},
	showingKeyboardComponentsStyle: {
		passwordInputStyle: { marginBottom: 0 },
		buttonContainerStyle: { flex: 0.7 },
		buttonStyle: { height: 30 },
		linksContainerStyle: { flex: 0.9 }
	}
};

@connect(state => ({
	userData: state.userData,
	isLoggedIn: state.isLoggedIn,
	autoLoginErrorMessage: state.autoLoginErrorMessage,
	orientation: state.currentOrientation,
	loginImages: state.loginImages,
	loginSynchedDataParameters: state.loginSynchedDataParameters,
	deviceId: state.deviceId,
	messages: state.messages
}))
export default class SignIn extends React.Component {
	static navigationOptions = { header: null };

	state = {
		errorMessage: "",
		spinnerVisible: false,
		userId: "",
		password: "",
		componentsStyle: styles.hiddenKeyboardComponentsStyle
	};

	componentDidMount() {
		if (this.props.isLoggedIn) {
			this.setState({
				userId: this.props.userData.userId,
				password: this.props.userData.password
			});
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
			errorMessage: "",
			componentsStyle: styles.showingKeyboardComponentsStyle
		});
		this.animatedLogo.transitionTo(styles.animatedLogoEndStyle, 500);
		if (this.animatedImage) {
			this.animatedImage.transitionTo(styles.animatedImageEndStyle, 500);
		}
	};

	_keyboardDidHide = () => {
		this.setState({ componentsStyle: styles.hiddenKeyboardComponentsStyle });
		this.animatedLogo.transitionTo(styles.animatedLogoInitStyle, 500);
		if (this.animatedImage != null) {
			this.animatedImage.transitionTo(styles.animatedImageInitStyle, 500);
		}
	};

	handleAnimatedLogo = ref => (this.animatedLogo = ref);

	handleAnimatedImage = ref => (this.animatedImage = ref);

	onUserIdChangeText = userId => {
		this.setState({ userId });
	};

	onPasswordChangeText = password => {
		this.setState({ password });
	};

	render() {
		return (
			<RootWrapper style={[styles.rootWrapperStyle, { padding: 0 }]}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
					<CentredWrapper>
						<AnimatedLogo
							style={[styles.animatedLogoInitStyle]}
							ref={this.handleAnimatedLogo}
						/>

						{this.props.orientation == "portrait" && (
							<AnimatedImage
								source={
									this.props.loginImages.length > 0 &&
									this.props.loginImages[0].imageIndex == 0
										? require("../images/login.jpg")
										: {
												uri: this.props.loginImages[0].uri
										  }
								}
								style={styles.animatedImageInitStyle}
								ref={this.handleAnimatedImage}
							/>
						)}

						<RkTextInput
							rkType="rounded inputText"
							style={{
								marginBottom: 0,
								flex: 0.8,
								marginLeft: containerPadding,
								marginRight: containerPadding
							}}
							placeholder="DNI"
							keyboardType="numeric"
							autoFocus
							onChangeText={this.onUserIdChangeText}
							onSubmitEditing={this.onSubmitUserId}
							returnKeyType="next"
							autoCapitalize="none"
							autoCorrect={false}
							value={this.props.isLoggedIn ? this.state.userId : null}
						/>

						<RkTextInput
							rkType="rounded inputText"
							style={
								(this.state.componentsStyle.passwordInputStyle,
								{
									flex: 0.8,
									marginLeft: containerPadding,
									marginRight: containerPadding
								})
							}
							placeholder="Contraseña"
							secureTextEntry
							onChangeText={this.onPasswordChangeText}
							autoCapitalize="none"
							autoCorrect={false}
							returnKeyType="done"
							keyboardType="default"
							ref="passwordInput"
							onSubmitEditing={this.signIn}
							value={this.props.isLoggedIn ? this.state.password : null}
						/>

						<View
							style={[
								{
									flexDirection: "row",
									marginLeft: containerPadding,
									marginRight: containerPadding
								},
								this.state.componentsStyle.buttonContainerStyle
							]}>
							<Button
								style={this.state.componentsStyle.buttonStyle}
								text="INICIAR SESIÓN"
								onPress={this.signIn}
							/>
						</View>

						<View style={this.state.componentsStyle.linksContainerStyle}>
							<View style={textWithLinkStyle.container}>
								<GenericText style={textWithLinkStyle.text}>
									¿No tenés una cuenta?
								</GenericText>
								<GenericLink
									containerStyle={textWithLinkStyle.link.container}
									contentStyle={textWithLinkStyle.link.content}
									onPress={this.goToSignUp}>
									Creá una nueva
								</GenericLink>
							</View>

							<View style={textWithLinkStyle.container}>
								<GenericText style={textWithLinkStyle.text}>
									¿Olvidaste tu contraseña?
								</GenericText>
								<GenericLink
									containerStyle={textWithLinkStyle.link.container}
									contentStyle={textWithLinkStyle.link.content}
									onPress={this.goToResetPassword}>
									Recuperala
								</GenericLink>
							</View>
						</View>

						{(this.state.errorMessage != "" ||
							this.props.autoLoginErrorMessage != "") && (
							<GenericText
								style={{ flex: 0.5 }}
								error={
									this.state.errorMessage ||
									this.props.autoLoginErrorMessage != ""
										? true
										: false
								}>
								{this.state.errorMessage}
								{this.props.autoLoginErrorMessage}
							</GenericText>
						)}

						<LoadingSpinner visible={this.state.spinnerVisible} />
					</CentredWrapper>
				</KeyboardAvoidingView>
			</RootWrapper>
		);
	}

	signIn = async () => {
		Keyboard.dismiss();
		if (!this.state.userId || !this.state.password) {
			this.setState({ errorMessage: Messages.INVALID_USER_ID_PASSWORD });
			return;
		}
		this.setState({ errorMessage: "", spinnerVisible: true });
		try {
			const deviceId = this.props.deviceId
				? this.props.deviceId
				: await getDeviceId(this.props.dispatch);
			await login(
				this.state.userId,
				this.state.password,
				deviceId,
				this.props.loginSynchedDataParameters,
				this.props.messages,
				this.props.dispatch
			);
			this.setState({ spinnerVisible: false });
			this.props.navigation.navigate(Screens.HomeStack);
		} catch (errorMessage) {
			this.setState({ spinnerVisible: false });
			if (
				Messages.CHECK_INTERNET_CONNECTION == errorMessage &&
				this.state.userId == this.props.userData.userId &&
				this.state.password == this.props.userData.password
			) {
				//offline login
				this.props.navigation.navigate(Screens.HomeStack);
			} else {
				this.setState({ errorMessage });
			}
		}
	};

	onSubmitUserId = () => {
		if (!this.state.password) {
			this.refs.passwordInput._focusInput();
		} else {
			this.signIn();
		}
	};

	goToSignUp = () => {
		Keyboard.dismiss();
		this.setState({ errorMessage: "" });
		this.props.navigation.navigate(Screens.SignUp);
	};

	goToResetPassword = () => {
		Keyboard.dismiss();
		this.setState({ errorMessage: "" });
		setTimeout(() => {
			this.props.navigation.navigate(Screens.ResetPassword);
		}, 1);
	};
}
