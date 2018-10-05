import React from "react";
import {
	Keyboard,
	View,
	KeyboardAvoidingView,
	Dimensions,
	Platform,
	TouchableWithoutFeedback
} from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
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
import { ActionsCreators } from "/redux/actions";
import AnalyticsHelper from "/helpers/AnalyticsHelper";

const AnimatedLogo = Animatable.createAnimatableComponent(Logo);

RkTheme.setType("RkTextInput", "inputText", genericTextInputStyle);

const styles = {
	animatedLogoInitStyle: { flex: 1, fontSize: 55 },
	animatedLogoEndStyle: { flex: 0.6, fontSize: 45 },
	image: {
		flex: -1,
		marginBottom: 5,
		marginTop: 5
	},

	rootWrapperStyle: { paddingTop: 10, padding: 0 },
	hiddenKeyboardComponentsStyle: {
		passwordInputStyle: { marginBottom: 10 },
		buttonContainerStyle: { flex: 0.68 },
		buttonStyle: { height: 40 },
		linksContainerStyle: { flex: 0.7 },
		firstLinkStyle: { flex: 0.5 },
		secondLinkStyle: { flex: 0.5 }
	},
	showingKeyboardComponentsStyle: {
		passwordInputStyle: { marginBottom: 5 },
		linksContainerStyle: { flex: 0.9 },
		firstLinkStyle: { flex: 0.3 },
		secondLinkStyle: { flex: 0.3 }
	},
	landscape: {
		showingKeyboardComponentsStyle: {
			buttonContainerStyle: { flex: 0.47 },
			buttonStyle: { height: 28 },
			buttonContentStyle: { fontSize: 12 },
			logoStyle: { flex: 0.45, fontSize: 23 },
			linksContainerStyle: { flex: 0.7 },
			firstLinkStyle: { flex: 0.5 },
			secondLinkStyle: { flex: 0.5 },
			passwordInputStyle: { marginBottom: 0, marginTop: 0 }
		}
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
	messages: state.messages,
	hasResetFirstPassword: state.hasResetFirstPassword
}))
export default class SignIn extends React.Component {
	static navigationOptions = { header: null };
	static isKeyboardShowing = false;

	state = {
		errorMessage: "",
		spinnerVisible: false,
		userId: "",
		password: "",
		componentsStyle: styles.hiddenKeyboardComponentsStyle
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.orientation == "landscape" && SignIn.isKeyboardShowing) {
			return {
				componentsStyle: {
					...styles.landscape.showingKeyboardComponentsStyle
				}
			};
		} else {
			return prevState;
		}
	}

	componentDidMount() {
		AnalyticsHelper.setPageHit(Screens.SignIn);
		Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
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
		SignIn.isKeyboardShowing = true;
		if (this.props.orientation != "landscape") {
			this.setState({
				componentsStyle: styles.showingKeyboardComponentsStyle
			});
			this.animatedLogo.transitionTo(styles.animatedLogoEndStyle, 500);
		} else {
			this.setState({
				componentsStyle: styles.landscape.showingKeyboardComponentsStyle
			});
			this.animatedLogo.transitionTo(
				styles.landscape.showingKeyboardComponentsStyle.logoStyle,
				500
			);
		}
	};

	_keyboardDidHide = () => {
		SignIn.isKeyboardShowing = false;
		this.setState({ componentsStyle: styles.hiddenKeyboardComponentsStyle });
		this.animatedLogo.transitionTo(styles.animatedLogoInitStyle, 500);
	};

	handleAnimatedLogo = ref => (this.animatedLogo = ref);

	onUserIdChangeText = userId => {
		this.setState({ userId });
	};

	onPasswordChangeText = password => {
		this.setState({ password });
	};

	onInputTextFocus = () => {
		this.setState({
			errorMessage: ""
		});
		this.props.dispatch(ActionsCreators.setAutoLoginErrorMessage(""));
	};

	hideKeyboard = () => {
		Keyboard.dismiss();
	};

	render() {
		return (
			<TouchableWithoutFeedback onPress={this.hideKeyboard}>
				<View style={{ flex: 1 }}>
					<RootWrapper
						style={[
							styles.rootWrapperStyle,
							{
								marginTop:
									Platform.OS == "ios" && this.props.orientation == "landscape"
										? 20
										: 0
							}
						]}>
						<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
							<CentredWrapper>
								<AnimatedLogo
									style={styles.animatedLogoInitStyle}
									ref={this.handleAnimatedLogo}
								/>

								{this.props.orientation == "portrait" &&
									this.state.componentsStyle ==
										styles.hiddenKeyboardComponentsStyle && (
										<AutoHeightImage
											source={
												this.props.loginImages.length > 0 &&
												this.props.loginImages[0].imageIndex == 0
													? require("../assets/images/login.jpg")
													: {
															uri: this.props.loginImages[0].uri
													  }
											}
											style={styles.image}
											width={Dimensions.get("window").width}
										/>
									)}

								<RkTextInput
									rkType="rounded inputText"
									style={{
										marginBottom: 0,
										flex: 0.5,
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
									onFocus={this.onInputTextFocus}
								/>

								<RkTextInput
									rkType="rounded inputText"
									style={[
										this.state.componentsStyle.passwordInputStyle,
										{
											flex: 0.5,
											marginLeft: containerPadding,
											marginRight: containerPadding
										}
									]}
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
									onFocus={this.onInputTextFocus}
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
										contentStyle={this.state.componentsStyle.buttonContentStyle}
										text="INICIAR SESIÓN"
										onPress={this.signIn}
									/>
								</View>

								<View style={this.state.componentsStyle.linksContainerStyle}>
									<View
										style={[
											textWithLinkStyle.container,
											this.state.componentsStyle.firstLinkStyle
										]}>
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

									{
										<View
											style={[
												textWithLinkStyle.container,
												this.state.componentsStyle.secondLinkStyle
											]}>
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
									}
								</View>

								{(this.state.errorMessage != "" ||
									this.props.autoLoginErrorMessage != "") && (
									<GenericText
										style={{
											flex: 0.7,
											marginLeft: containerPadding,
											marginRight: containerPadding
										}}
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
				</View>
			</TouchableWithoutFeedback>
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
			if (this.props.hasResetFirstPassword) {
				this.props.navigation.navigate(Screens.HomeStack);
			} else {
				this.props.dispatch(ActionsCreators.setInResetFirstPasswordMode(true));
				this.props.navigation.navigate(Screens.ResetPassword);
			}
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
