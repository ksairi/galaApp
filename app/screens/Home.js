import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { RkButton } from "react-native-ui-kitten";
import RootWrapper from "/components/presentationals/RootWrapper";
import CentredWrapper from "/components/presentationals/CentredWrapper";
import { ActionsCreators } from "/redux/actions";
import { Screens } from "/config/settings";
import Icon from "/helpers/ImageHelper";
import GenericText from "/components/presentationals/GenericText";
import { activeSideMenuItemColor } from "/components/styles";
import Footer from "/components/presentationals/Footer";

const styles = {
	imageContainer: {
		marginTop: 20,
		flex: 0.5
	},
	buttonsContainer: {
		flex: 0.5,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center"
	},
	promotionsContainer: {
		marginTop: 20,
		marginBottom: 20,
		flex: 5
	},
	footerContainer: {
		flex: 1,
		flexDirection: "row"
	},

	buttonWrapper: {
		flex: 1.5,
		backgroundColor: activeSideMenuItemColor,
		justifyContent: "center",
		padding: 5,
		marginRight: 10,
		marginTop: 10,
		width: 100
	},
	label: {
		flex: -1,
		fontSize: 10,
		fontFamily: "brother-1816-bold",
		marginTop: 5
	}
};

@connect(state => ({
	userData: state.userData,
	isUsingCache: state.isUsingCache,
	currentHomeDrawerOption: state.currentHomeDrawerOption
}))
export default class Profile extends React.Component {
	iconsData = [
		{
			icon: "user-icon",
			label: "MI PERFIL",
			screen: Screens.Profile
		},
		{
			icon: "routines",
			label: "RUTINAS",
			screen: Screens.Routines,
			style: {
				fontSize: 30,
				paddingBottom: 10
			}
		},
		{
			icon: "classes",
			label: "MIS CLASES",
			screen: Screens.Classes
		},
		{
			icon: "timetable",
			label: "HORARIOS",
			screen: Screens.Timetable
		},
		{
			icon: "messages",
			label: "MENSAJES",
			screen: Screens.Messages,
			style: {
				fontSize: 30
			}
		},
		{
			icon: "referrals",
			label: "REFERIDOS",
			screen: Screens.Referrals
		}
	];

	componentDidMount() {
		if (this.props.currentHomeDrawerOption != "") {
			this.props.navigation.navigate(this.props.currentHomeDrawerOption);
			this.props.dispatch(ActionsCreators.setCurrentHomeDrawerOption(""));
		}
	}

	onIconPressed = screen => () => {
		this.props.navigation.navigate(screen);
	};
	render() {
		return (
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1
				}}>
				<RootWrapper>
					<CentredWrapper>
						<View style={styles.imageContainer}>
							<GenericText> imageContainer </GenericText>
						</View>
						<View style={styles.buttonsContainer}>
							{this.iconsData.map((iconData, index) => (
								<TouchableOpacity
									key={index}
									onPress={this.onIconPressed(iconData.screen)}>
									<View style={styles.buttonWrapper}>
										<View
											style={{
												alignItems: "center"
											}}>
											<Icon
												name={iconData.icon}
												style={[
													{
														fontSize: 40
													},
													iconData.style
												]}
												color="white"
											/>
											<GenericText style={styles.label}>
												{iconData.label}
											</GenericText>
										</View>
									</View>
								</TouchableOpacity>
							))}
						</View>
						<View style={styles.promotionsContainer}>
							<GenericText> promos container </GenericText>
						</View>
						<View style={styles.footerContainer}>
							<Footer />
						</View>
					</CentredWrapper>
				</RootWrapper>
			</ScrollView>
		);
	}
}
