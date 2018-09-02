import React from "react";
import {
	View,
	ScrollView,
	TouchableOpacity,
	Image,
	Dimensions
} from "react-native";
import { Permissions } from "expo";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { RkButton } from "react-native-ui-kitten";
import RootWrapper from "/components/presentationals/RootWrapper";
import Footer from "/components/presentationals/Footer";
import { Screens } from "/config/settings";
import GenericText from "/components/presentationals/GenericText";
import { getRemoteProfilePicture } from "/helpers/UserDataHelper";
const styles = {
	photoContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	userDataContainer: {
		flex: 1
	},
	userDataRow: {
		flexDirection: "row",
		flex: 1
	},
	label: {
		fontSize: 18,
		textAlign: "left",
		flex: -1
	},
	userData: {
		fontFamily: "brother-1816-bold",
		fontSize: 18,
		flex: 1,
		textAlign: "right"
	}
};

const NO_PROFILE_PICTURE_PATH = "../images/no_profile_picture.jpg";

@connect(state => ({
	userData: state.userData,
	profilePicture: state.profilePicture,
	orientation: state.currentOrientation
}))
export default class Profile extends React.Component {
	state = {
		hasProfilePic: false,
		deviceWidth: Dimensions.get("window").width,
		imageSource: require(NO_PROFILE_PICTURE_PATH)
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.orientation) {
			return {
				deviceWidth: Dimensions.get("window").width
			};
		}
	}

	componentDidMount = () => {
		this.getImageSource();
	};

	goToSettings = () => {
		this.props.navigation.navigate(Screens.Settings);
	};

	useCamera = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		if (status === "granted") {
			this.props.navigation.navigate(Screens.CameraView);
		}
	};

	onErrorLoadProfilePicture = () =>
		this.setState({
			imageSource: require(NO_PROFILE_PICTURE_PATH)
		});

	getImageSource = () => {
		if (this.props.profilePicture) {
			this.setState({
				imageSource: {
					uri: `${this.props.profilePicture.path}`
				}
			});
		} else {
			getRemoteProfilePicture(this.props.userData.userId)
				.then(uri => {
					if (uri) {
						this.setState({
							imageSource: { uri }
						});
					}
				})
				.catch(() => {
					this.setState({
						imageSource: require(NO_PROFILE_PICTURE_PATH)
					});
				});
		}
	};

	render() {
		return (
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1
				}}>
				<RootWrapper>
					<View style={styles.photoContainer}>
						<Image
							source={this.state.imageSource}
							style={{
								width: 100,
								height: 100,
								borderRadius: 100 / 2
							}}
							//onError={this.onErrorLoadProfilePicture}
						/>
						<TouchableOpacity
							onPress={this.useCamera}
							style={{
								backgroundColor: "white",
								width: 40,
								height: 40,
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 40 / 2,
								position: "absolute",
								left: this.state.deviceWidth / 2 + 15,
								top: 5
							}}>
							<FontAwesome name="camera-retro" size={32} />
						</TouchableOpacity>
					</View>
					<GenericText
						style={{
							fontFamily: "brother-1816-bold",
							fontSize: 22,
							flex: 0.6
						}}>
						MI INFORMACIÓN
					</GenericText>
					<View style={styles.userDataContainer}>
						<View style={styles.userDataRow}>
							<GenericText style={styles.label}>Nombre</GenericText>
							<GenericText style={styles.userData}>
								{this.props.userData.name}
							</GenericText>
						</View>
						{
							<View style={styles.userDataRow}>
								<GenericText style={styles.label}>Email</GenericText>
								<GenericText style={[styles.userData, { fontSize: 16 }]}>
									{this.props.userData.mail ? this.props.userData.mail : "N/D"}
								</GenericText>
							</View>
						}
						{
							<View style={styles.userDataRow}>
								<GenericText style={styles.label}>Teléfono</GenericText>
								<GenericText style={styles.userData}>
									{this.props.userData.phoneNumber
										? this.props.userData.phoneNumber
										: "N/D"}
								</GenericText>
							</View>
						}
					</View>
					<View style={{ flexDirection: "row", flex: 1 }}>
						<RkButton
							shapeType="outline"
							style={{
								backgroundColor: "#12194d",
								alignSelf: "center",
								flex: 1,
								marginTop: 10,
								marginBottom: 10
							}}
							contentStyle={{
								fontSize: 22,
								fontFamily: "brother-1816-bold"
							}}
							onPress={this.goToSettings}>
							CONFIGURACIÓN
						</RkButton>
					</View>
					<Footer />
				</RootWrapper>
			</ScrollView>
		);
	}
}
