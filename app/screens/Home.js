import React from "react";
import {
	View,
	ScrollView,
	TouchableOpacity,
	Image,
	Dimensions
} from "react-native";
import { connect } from "react-redux";
import ImageSlider from "react-native-image-slider";
import RootWrapper from "/components/presentationals/RootWrapper";
import CentredWrapper from "/components/presentationals/CentredWrapper";
import { ActionsCreators } from "/redux/actions";
import { Screens } from "/config/settings";
import Icon from "/helpers/ImageHelper";
import GenericText from "/components/presentationals/GenericText";
import { activeSideMenuItemColor } from "/components/styles";
import Footer from "/components/presentationals/Footer";
import LoadingSpinner from "/components/presentationals/LoadingSpinner";
const styles = {
	imageContainer: {
		marginTop: 20,
		flex: -1
	},
	buttonsContainer: {
		flex: 0.2,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		marginTop: 20
	},
	promotionsContainer: {
		marginTop: 30,
		marginBottom: 60,
		marginLeft: 20,
		marginRight: 20,
		flex: 1
	},
	footerContainer: {
		flex: 0.5,
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
	currentHomeDrawerOption: state.currentHomeDrawerOption,
	mainMenuImages: state.mainMenuImages,
	promotions: state.promotionsData.promotions
}))
export default class Profile extends React.Component {
	state = {
		sliderImagesBase64String: []
	};
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

		this.props.mainMenuImages.map(item => {
			Expo.FileSystem.readAsStringAsync(item.image)
				.then(imageBase64 => {
					this.setState({
						sliderImagesBase64String: [
							...this.state.sliderImagesBase64String,
							imageBase64
						]
					});
				})
				.catch(error => {
					console.log(error);
				});
		});
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
				<RootWrapper style={{ padding: 0 }}>
					{this.state.sliderImagesBase64String.length > 0 ? (
						<CentredWrapper>
							<View style={styles.imageContainer}>
								<ImageSlider
									autoPlayWithInterval={7000}
									images={this.props.mainMenuImages}
									customSlide={({ index, item, style, width }) => {
										return (
											<Image
												key={index}
												source={{
													uri:
														"data:image/jpg;base64," +
														this.state.sliderImagesBase64String[index]
												}}
												style={{
													height: 205,
													width: Dimensions.get("window").width
												}}
											/>
										);
									}}
								/>
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
								<GenericText
									style={{ fontFamily: "brother-1816-bold", fontSize: 35 }}>
									¡ENTERATE!
								</GenericText>
								{this.props.promotions &&
									this.props.promotions.map((promotion, index) => (
										<View
											key={index}
											style={{
												backgroundColor: activeSideMenuItemColor,
												paddingTop: 15,
												marginTop: 15
											}}>
											<GenericText
												style={{
													fontFamily: "brother-1816-bold",
													fontSize: 20,
													flex: -1,
													paddingLeft: 5,
													paddingRight: 5
												}}>
												{promotion.title}
											</GenericText>
											<GenericText
												style={{
													fontFamily: "lato-regular",
													fontSize: 15,
													marginTop: 10,
													flex: -1,
													paddingLeft: 5,
													paddingRight: 5
												}}>
												{promotion.subtitle}
											</GenericText>
											<Image
												source={{
													uri: "data:image/jpg;base64," + promotion.image
												}}
												style={{
													height: 205 * 0.89,
													width: Dimensions.get("window").width * 0.89,
													marginTop: 15
												}}
											/>
										</View>
									))}
							</View>
							<View style={styles.footerContainer}>
								<Footer />
							</View>
						</CentredWrapper>
					) : (
						<LoadingSpinner visible={true} message={"Cargando"} />
					)}
				</RootWrapper>
			</ScrollView>
		);
	}
}
