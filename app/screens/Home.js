import React from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import RootWrapper from "/components/presentationals/RootWrapper";
import CentredWrapper from "/components/presentationals/CentredWrapper";
import { ActionsCreators } from "/redux/actions";
import { Screens } from "/config/settings";
import Icon from "/helpers/ImageHelper";
import GenericText from "/components/presentationals/GenericText";
import Footer from "/components/presentationals/Footer";
import LoadingSpinner from "/components/presentationals/LoadingSpinner";
import ImageSlider from "/components/presentationals/ImageSlider";
import * as ScreenDimensions from "/utils/ScreenDimensions";
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
		backgroundColor: "#12194d",
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
	promotions: state.promotions
}))
export default class Home extends React.Component {
	state = {
		sliderImages: [],
		promotionsBase64Images: []
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
	loadSliderImages = () => {
		var localImages = [];
		this.props.mainMenuImages.map((item, index) => {
			if (item.local) {
				//local images
				switch (item.imageIndex) {
					case 0: {
						localImages.push(require("../images/main_menu_slider_0.jpg"));
						break;
					}
					case 1: {
						localImages.push(require("../images/main_menu_slider_1.jpg"));
						break;
					}
					case 2: {
						localImages.push(require("../images/main_menu_slider_2.jpg"));
						break;
					}
				}
			} else {
				//dynamic images
				Expo.FileSystem.readAsStringAsync(item.image)
					.then(imageBase64 => {
						this.setState({
							sliderImages: [
								...this.state.sliderImages,
								{
									base64String: imageBase64,
									fileExtension: this.props.mainMenuImages[index].fileExtension
								}
							]
						});
					})
					.catch(error => {
						console.log(error);
					});
			}
		});

		this.setState({
			sliderImages: [...this.state.sliderImages, ...localImages]
		});
	};
	loadPromotionsImages = () => {
		this.props.promotions.map(item => {
			Expo.FileSystem.readAsStringAsync(item.image)
				.then(imageBase64 => {
					this.setState({
						promotionsBase64Images: [
							...this.state.promotionsBase64Images,
							imageBase64
						]
					});
				})
				.catch(error => {
					console.log(error);
				});
		});
	};

	componentDidMount() {
		if (this.props.currentHomeDrawerOption != "") {
			this.props.navigation.navigate(this.props.currentHomeDrawerOption);
			this.props.dispatch(ActionsCreators.setCurrentHomeDrawerOption(""));
		}
		this.loadSliderImages();
		this.loadPromotionsImages();
	}

	componentDidUpdate(prevProps, prevStates) {
		if (prevProps.mainMenuImages == 0) {
			this.loadSliderImages();
		}
		if (prevProps.promotions == 0) {
			this.loadPromotionsImages();
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
				<RootWrapper style={{ padding: 0 }}>
					{this.state.sliderImages.length > 0 ||
					this.state.promotionsBase64Images.length > 0 ? (
						<CentredWrapper>
							<View style={styles.imageContainer}>
								<ImageSlider
									images={this.state.sliderImages}
									imageHeight={205}
									imageWidth={ScreenDimensions.getPortraitWidth()}
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
												backgroundColor: "#12194d",
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
													uri:
														"data:image/" +
														this.props.promotions.fileExtension +
														";base64," +
														this.state.promotionsBase64Images[index]
												}}
												style={{
													alignSelf: "center",
													height: 205 * 0.89,
													width: ScreenDimensions.getPortraitWidth() * 0.89,
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
