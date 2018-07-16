import React from "react";
import { ScrollView, TouchableOpacity, AppState } from "react-native";
import { connect } from "react-redux";
import { Screens } from "/config/settings";
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
	newMemberData: state.newMemberData
}))
export default class DrawerContentComponent extends React.PureComponent {
	state = {
		drawerItems: [
			{
				icon: "exclamation",
				label: "SOCIO NUEVO",
				screen: Screens.NewMember,
				otherIcon: true,
				style: {
					icon: { marginTop: 5, paddingLeft: 15, fontSize: 30 },
					label: { marginTop: 10, color: "green", fontFamily: "lato-regular" },
					arrow: { marginTop: 15 }
				}
			},
			{
				icon: "user-icon",
				label: "MI PERFIL",
				screen: Screens.Profile,
				style: {
					icon: { marginTop: 5, paddingLeft: 7, fontSize: 30 },
					label: { marginTop: 5 },
					arrow: { marginTop: 15 }
				}
			},
			{
				icon: "routines",
				label: "RUTINAS",
				screen: Screens.Routines,
				style: {
					icon: { marginTop: 3, fontSize: 25 },
					arrow: { marginTop: 10 }
				}
			},
			{
				icon: "classes",
				label: "MIS CLASES",
				screen: Screens.Classes,
				style: {
					icon: { fontSize: 40, paddingLeft: 15 },
					label: { marginTop: 5 },
					arrow: { marginTop: 12 }
				}
			},
			{
				icon: "timetable",
				label: "HORARIOS",
				screen: Screens.Timetable,
				style: {
					icon: { fontSize: 37, paddingLeft: 5 },
					label: { marginTop: 7 },
					arrow: { marginTop: 15 }
				}
			},
			{
				icon: "messages",
				label: "MENSAJES",
				screen: Screens.Messages,
				style: {
					icon: {
						fontSize: 28,
						paddingLeft: 4,
						marginTop: 3
					},
					arrow: {
						marginTop: 10
					}
				}
			},
			{
				icon: "referrals",
				label: "REFERIDOS",
				screen: Screens.Referrals,
				style: { label: { marginTop: 5 }, arrow: { marginTop: 13 } }
			}
		],
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
				if (freeEntryDaysLeft > 0) {
					this.setState({
						freeEntryDaysLeft: UserDataHelper.getFreeEntryDaysLeft(
							this.props.newMemberData.freeEntryData.date
						)
					});
				} else {
					this.props.navigation.navigate(Screens.Home);
				}
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
				{this.state.drawerItems.map((drawerItem, index) => {
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
								style={drawerItem.style}
								otherIcon={drawerItem.otherIcon}
							/>
						);
					}
				})}
			</ScrollView>
		);
	}
}
