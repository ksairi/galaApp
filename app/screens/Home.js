import React from "react";
import {
	View,
	ScrollView,
	TouchableOpacity,
	AppState,
	Image
} from "react-native";
import { connect } from "react-redux";
import AutoHeightImage from "react-native-auto-height-image";
import RootWrapper from "/components/presentationals/RootWrapper";
import CentredWrapper from "/components/presentationals/CentredWrapper";
import { ActionsCreators } from "/redux/actions";
import { Screens, SectionsData } from "/config/settings";
import Icon from "/helpers/ImageHelper";
import GenericText from "/components/presentationals/GenericText";
import Footer from "/components/presentationals/Footer";
import LoadingSpinner from "/components/presentationals/LoadingSpinner";
import ImageSlider from "/components/presentationals/ImageSlider";
import * as ScreenDimensions from "/utils/ScreenDimensions";
import { FontAwesome } from "@expo/vector-icons";
import * as UserDataHelper from "/helpers/UserDataHelper";

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
	promotions: state.promotions,
	newMemberData: state.newMemberData,
	isDownloadingRemoteImages: state.isDownloadingRemoteImages
}))
export default class Home extends React.Component {
	state = {
		sliderImages: [],
		appState: AppState.currentState,
		promotionsImageWidth: null
	};

	static screenDensity = ScreenDimensions.getScreenDensity();

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

	loadSliderImages = () => {
		var sliderImages = [];
		this.props.mainMenuImages.map((item, index) => {
			if (item.local) {
				//local images
				switch (item.imageIndex) {
					case 0: {
						sliderImages.push(require("../images/main_menu_slider_0.jpg"));
						break;
					}
					case 1: {
						sliderImages.push(require("../images/main_menu_slider_1.jpg"));
						break;
					}
					case 2: {
						sliderImages.push(require("../images/main_menu_slider_2.jpg"));
						break;
					}
				}
			} else {
				//dynamic images
				sliderImages.push({ uri: item.uri });
			}
		});

		this.setState({
			sliderImages
		});
	};

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

	componentDidMount() {
		AppState.addEventListener("change", this._handleAppStateChange);
		if (this.props.currentHomeDrawerOption != "") {
			this.props.navigation.navigate(this.props.currentHomeDrawerOption);
			this.props.dispatch(ActionsCreators.setCurrentHomeDrawerOption(""));
		}
		this.loadSliderImages();
		if (this.props.promotions[0]) {
			Image.getSize(
				this.props.promotions[0].uri,
				width => {
					this.setState({
						promotionsImageWidth: (width * 160) / Home.screenDensity
					});
				},
				errorMsg => {
					console.log(errorMsg);
				}
			);
		}
	}

	componentWillUnmount() {
		AppState.removeEventListener("change", this._handleAppStateChange);
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
					{this.state.sliderImages.length > 0 &&
					!this.props.isDownloadingRemoteImages ? (
						<CentredWrapper>
							<View style={styles.imageContainer}>
								<ImageSlider
									images={this.state.sliderImages}
									imageWidth={ScreenDimensions.getPortraitWidth()}
								/>
							</View>

							<View style={styles.buttonsContainer}>
								{SectionsData.map((sectionData, index) => {
									if (
										sectionData.screen != Screens.NewMember ||
										(sectionData.screen == Screens.NewMember &&
											this.state.freeEntryDaysLeft &&
											this.state.freeEntryDaysLeft > 0)
									) {
										return (
											<TouchableOpacity
												key={index}
												onPress={this.onIconPressed(sectionData.screen)}>
												<View style={styles.buttonWrapper}>
													<View
														style={{
															alignItems: "center"
														}}>
														{sectionData.otherIcon ? (
															<FontAwesome
																name={sectionData.icon}
																style={sectionData.homeStyle}
															/>
														) : (
															<Icon
																name={sectionData.icon}
																style={sectionData.homeStyle}
															/>
														)}
														<GenericText style={styles.label}>
															{sectionData.label}
														</GenericText>
													</View>
												</View>
											</TouchableOpacity>
										);
									}
								})}
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
											<AutoHeightImage
												source={{
													uri: promotion.uri
												}}
												width={
													this.state.promotionsImageWidth
														? this.state.promotionsImageWidth
														: 0
												}
												style={{
													alignSelf: "center",
													marginTop: 15
												}}
											/>
										</View>
									))}
							</View>
							<Footer />
						</CentredWrapper>
					) : (
						<LoadingSpinner visible={true} message={"Cargando"} />
					)}
				</RootWrapper>
			</ScrollView>
		);
	}
}
