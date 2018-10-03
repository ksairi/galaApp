import React from "react";
import {
	TouchableOpacity,
	View,
	Text,
	NetInfo,
	Dimensions,
	Platform,
	TouchableWithoutFeedback,
	Keyboard
} from "react-native";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable-promise";
import Icon from "/helpers/ImageHelper";
import { containerPadding, genericBackgroundColor } from "/components/styles";
import Logo from "components/presentationals/Logo";
import GenericText from "components/presentationals/GenericText";
import NetworkHelper from "/helpers/NetworkHelper";
import { ActionsCreators } from "/redux/actions/";
const styles = {
	wrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		backgroundColor: genericBackgroundColor,
		paddingTop: 10,
		paddingLeft: containerPadding
	},
	backButton: {
		marginTop: 3,
		flex: 1
	},
	portrait: { logo: { fontSize: 40 }, wrapper: { flex: 0.15 } },
	landscape: {
		logo: { fontSize: 30 },
		wrapper: { flex: 0.17 }
	},
	title: { fontSize: 19, color: "white", fontFamily: "brother-1816-bold" }
};
styles.firstButton = styles.backButton;

const AnimatedBanner = Animatable.createAnimatableComponent(View);

@connect(state => ({
	orientation: state.currentOrientation,
	newNotificationsText: state.notificationsText
}))
export default class Header extends React.PureComponent {
	static timeoutId;

	state = {
		isDeviceConnected: true,
		wasDeviceDisconnected: false,
		hideConnectedMessage: true
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		var newState = {};
		if (nextProps.isHomeHeader != prevState.isHomeHeader) {
			newState.isHomeHeader = nextProps.isHomeHeader;
		}
		if (nextProps.orientation) {
			newState.headerStyle =
				nextProps.orientation == "landscape"
					? styles.landscape
					: styles.portrait;
		}
		return newState;
	}

	handleBannerRef = ref => (this.animatedBanner = ref);

	hideNotificationsText = () => {
		setTimeout(() => {
			this.props.dispatch(ActionsCreators.setNotificationsText(null));
			this.animatedBanner.transitionTo({ opacity: 0 }, 2000);
		}, 4000);
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.props.newNotificationsText != "") {
			this.animatedBanner.transitionTo({ opacity: 1 }, 1000);
			this.hideNotificationsText();
		}
	}

	componentDidMount() {
		NetInfo.addEventListener("connectionChange", this.handleConnectivityChange);
		NetworkHelper.isDeviceConnected().then(isDeviceConnected => {
			this.setState({
				isDeviceConnected,
				wasDeviceDisconnected: !isDeviceConnected,
				hideConnectedMessage: isDeviceConnected
			});
		});
	}

	componentWillUnmount() {
		NetInfo.removeEventListener(
			"connectionChange",
			this.handleConnectivityChange
		);
		clearTimeout(Header.timeoutId);
	}

	handleConnectivityChange = connectionInfo => {
		const isDeviceConnected = NetworkHelper.isDeviceConnected(connectionInfo);
		this.setState({
			isDeviceConnected,
			wasDeviceDisconnected: isDeviceConnected,
			hideConnectedMessage: !isDeviceConnected
		});
	};

	showBackToConnection = () => {
		if (this.state.wasDeviceDisconnected && !this.state.hideConnectedMessage) {
			Header.timeoutId = setTimeout(() => {
				this.setState({ hideConnectedMessage: true });
			}, 3000);
			return (
				<GenericText
					style={{
						backgroundColor: "green"
					}}>
					Conectado!
				</GenericText>
			);
		} else {
			return null;
		}
	};

	onMenuPressed = () => {
		this.props.navigation.toggleDrawer();
	};

	onBackPressed = () => {
		if (this.props.backScreen) {
			this.props.navigation.navigate(this.props.backScreen);
		} else {
			this.props.navigation.goBack();
		}
	};

	hideKeyboard = () => {
		Keyboard.dismiss();
	};

	render() {
		return (
			<TouchableWithoutFeedback onPress={this.hideKeyboard}>
				<View style={this.state.headerStyle.wrapper}>
					<View style={styles.wrapper}>
						{Platform.OS == "ios" && (
							<AnimatedBanner
								useNativeDriver={true}
								ref={this.handleBannerRef}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									flexDirection: "row",
									width: Dimensions.get("window").width,
									backgroundColor: "yellow",
									zIndex: 2,
									height: 30,
									opacity: 0,
									alignItems: "center"
								}}>
								<GenericText
									style={{
										color: genericBackgroundColor,
										fontFamily: "lato-bold"
									}}>
									{this.props.newNotificationsText}
								</GenericText>
							</AnimatedBanner>
						)}

						<View
							style={{
								flex: 0.9,
								zIndex: 1
							}}>
							{this.props.isHomeHeader ? (
								<TouchableOpacity
									onPress={this.onMenuPressed}
									style={styles.firstButton}>
									<Icon name="menu" size={20} color="white" />
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									onPress={this.onBackPressed}
									style={styles.backButton}>
									<Icon
										name="arrow-navigation-white-left"
										size={20}
										color="white"
									/>
								</TouchableOpacity>
							)}
						</View>

						<View
							style={{
								flex: 2.5,
								flexDirection: "row",
								justifyContent: "center",
								zIndex: 1
							}}>
							{this.props.title ? (
								<Text style={styles.title}>{this.props.title}</Text>
							) : (
								<Logo style={this.state.headerStyle.logo} />
							)}
						</View>

						<View style={{ flex: 1, flexDirection: "row", zIndex: 1 }}>
							{!this.state.isDeviceConnected ? (
								<GenericText
									style={{
										backgroundColor: "red"
									}}>
									Sin conexión
								</GenericText>
							) : (
								this.showBackToConnection()
							)}
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
