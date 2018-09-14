import React from "react";
import { TouchableOpacity, View, Text, NetInfo } from "react-native";
import { connect } from "react-redux";
import Icon from "/helpers/ImageHelper";
import { containerPadding } from "/components/styles";
import Logo from "components/presentationals/Logo";
import GenericText from "components/presentationals/GenericText";
import NetworkHelper from "/helpers/NetworkHelper";

const styles = {
	wrapper: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		backgroundColor: "#0b1143",
		paddingTop: 10,
		paddingLeft: containerPadding
	},
	backButton: {
		marginTop: 3,
		flex: 1
	},
	portrait: {},
	landscape: {
		logo: { fontSize: 30 }
	},
	title: { fontSize: 20, color: "white", fontFamily: "brother-1816-bold" }
};
styles.firstButton = styles.backButton;

@connect(state => ({
	orientation: state.currentOrientation
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

	render() {
		return (
			<View style={{ flex: 0.13 }}>
				<View style={styles.wrapper}>
					<View style={{ flex: 0.9 }}>
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
							flex: 2.2,
							flexDirection: "row",
							justifyContent: "center"
						}}>
						{this.props.title ? (
							<Text style={styles.title}>{this.props.title}</Text>
						) : (
							<Logo style={[{ fontSize: 40 }, this.state.headerStyle.logo]} />
						)}
					</View>

					<View style={{ flex: 1, flexDirection: "row" }}>
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
		);
	}
}
