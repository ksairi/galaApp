import React from "react";
import { ScrollView, TouchableOpacity, AppState } from "react-native";
import { connect } from "react-redux";
import { Screens, SectionsData } from "/config/settings";
import DrawerItem from "/components/presentationals/DrawerItem";
import Logo from "/components/presentationals/Logo";
import { genericBackgroundColor } from "/components/styles";
import * as UserDataHelper from "/helpers/UserDataHelper";

const styles = {
	drawerItemsWrapper: {
		paddingTop: Expo.Constants.statusBarHeight + 10,
		backgroundColor: genericBackgroundColor,
		alignItems: "flex-start",
		paddingLeft: 5,
		paddingBottom: 5,
		flexGrow: 1
	},
	headerIcon: {
		flex: 1,
		fontSize: 40
	}
};

@connect(state => ({
	newMemberData: state.newMemberData,
	newMessagesCount: state.newMessagesCount
}))
export default class DrawerContentComponent extends React.PureComponent {
	state = {
		appState: AppState.currentState,
		freeEntryDaysLeft: null
	};

	componentDidMount() {
		AppState.addEventListener("change", this._handleAppStateChange);
	}

	componentWillUnmount() {
		AppState.removeEventListener("change", this._handleAppStateChange);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.newMemberData) {
			return {
				freeEntryDaysLeft: UserDataHelper.getFreeEntryDaysLeft(
					nextProps.newMemberData.freeEntryData.date
				)
			};
		}
		return prevState;
	}

	_handleAppStateChange = nextAppState => {
		if (
			this.state.appState.match(/inactive|background/) &&
			nextAppState === "active"
		) {
			if (this.props.newMemberData) {
				const freeEntryDaysLeft = UserDataHelper.getFreeEntryDaysLeft(
					this.props.newMemberData.freeEntryData.date
				);
				this.setState({
					freeEntryDaysLeft
				});
			}
		}
		this.setState({ appState: nextAppState });
	};

	navigateTo = screen => {
		this.props.navigation.navigate(screen);
	};
	navigateToHome = screen => () => {
		this.props.navigation.navigate(screen);
	};

	render() {
		return (
			<ScrollView contentContainerStyle={styles.drawerItemsWrapper}>
				<TouchableOpacity
					style={{ flex: 1, flexDirection: "row", marginLeft: 13 }}
					onPress={this.navigateToHome(Screens.Home)}>
					<Logo style={styles.headerIcon} />
				</TouchableOpacity>
				{SectionsData.map((drawerItem, index) => {
					if (
						drawerItem.screen != Screens.NewMember ||
						(drawerItem.screen == Screens.NewMember &&
							this.state.freeEntryDaysLeft &&
							this.state.freeEntryDaysLeft > 0)
					) {
						return (
							<DrawerItem
								key={index}
								active={this.props.activeItemKey == drawerItem.screen}
								icon={drawerItem.icon}
								label={drawerItem.label}
								screen={drawerItem.screen}
								onPress={this.navigateTo}
								style={drawerItem.drawerStyle}
								otherIcon={drawerItem.otherIcon}
								labelExtraData={
									drawerItem.label == "MENSAJES" &&
									this.props.newMessagesCount > 0
										? " (" + this.props.newMessagesCount + ")"
										: null
								}
							/>
						);
					}
				})}
			</ScrollView>
		);
	}
}
