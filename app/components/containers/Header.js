import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { connect } from "react-redux";
import Icon from "/helpers/ImageHelper";
import { containerPadding } from "/components/styles";
import Logo from "components/presentationals/Logo";

const styles = {
	wrapper: {
		flex: 0.15,
		flexDirection: "row",
		alignItems: "flex-start",
		backgroundColor: "#0b1143",
		marginTop: Expo.Constants.statusBarHeight,
		paddingTop: 20,
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
	state = {};

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
				{this.props.title ? (
					<View
						style={{
							flex: 2.2,
							flexDirection: "row",
							justifyContent: "center"
						}}>
						<Text style={styles.title}>{this.props.title}</Text>
					</View>
				) : (
					<View
						style={{
							flex: 2.2,
							flexDirection: "row",
							justifyContent: "center"
						}}>
						<Logo style={[{ fontSize: 50 }, this.state.headerStyle.logo]} />
					</View>
				)}

				<View style={{ flex: 1, flexDirection: "row" }} />
			</View>
		);
	}
}
