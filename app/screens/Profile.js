import React from "react";
import {
	View,
	ScrollView,
	TouchableOpacity,
	ImageBackground,
	Image,
	Dimensions
} from "react-native";
import { Camera, Permissions, FileSystem } from "expo";
import {
	Ionicons,
	MaterialIcons,
	FontAwesome,
	Entypo
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { RkButton } from "react-native-ui-kitten";
import RootWrapper from "/components/presentationals/RootWrapper";
import Footer from "/components/presentationals/Footer";
import { Messages, Screens } from "/config/settings";
import GenericText from "/components/presentationals/GenericText";
import { ActionsCreators } from "/redux/actions/";
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
	},
	camera: {
		flex: 1,
		justifyContent: "space-between"
	},
	topBar: {
		flex: 0.2,
		backgroundColor: "transparent",
		flexDirection: "row",
		justifyContent: "space-around",
		paddingTop: 5
	},
	bottomBar: {
		paddingBottom: 5,
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		flex: 1,
		flexDirection: "row",
		paddingLeft: 10,
		paddingRight: 10
	},
	toggleButton: {
		flex: 0.25,
		height: 40,
		marginHorizontal: 2,
		marginBottom: 10,
		marginTop: 0,
		padding: 5,
		alignItems: "center",
		justifyContent: "center"
	}
};

const flashModeOrder = {
	off: "on",
	on: "auto",
	auto: "torch",
	torch: "off"
};

const flashIcons = {
	off: "flash-off",
	on: "flash-on",
	auto: "flash-auto",
	torch: "highlight"
};

@connect(state => ({
	userData: state.userData,
	profilePicturePath: state.profilePicturePath,
	orientation: state.currentOrientation
}))
export default class Profile extends React.Component {
	state = {
		hasCameraPermission: null,
		cameraType: Camera.Constants.Type.front,
		flash: "off",
		hasProfilePic: false,
		renderCamera: false,
		pictureTaken: null,
		deviceWidth: Dimensions.get("window").width
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.orientation) {
			return {
				deviceWidth: Dimensions.get("window").width
			};
		}
	}

	componentDidMount = () => {
		Expo.FileSystem.getInfoAsync(this.props.profilePicturePath)
			.then(response => {
				this.setState({ hasProfilePic: response.exists });
			})
			.catch(() => {});
	};

	useCamera = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		if (status === "granted") {
			this.setState({ renderCamera: true });
		}
	};

	renderCameraViewTopBar = () => (
		<View style={styles.topBar}>
			<TouchableOpacity style={styles.toggleButton} onPress={this.stopCamera}>
				<Ionicons name="md-arrow-back" size={32} color="white" />
			</TouchableOpacity>
			<TouchableOpacity style={styles.toggleButton} onPress={this.toggleFacing}>
				<Ionicons name="ios-reverse-camera" size={32} color="white" />
			</TouchableOpacity>
			<TouchableOpacity style={styles.toggleButton} onPress={this.toggleFlash}>
				<MaterialIcons
					name={flashIcons[this.state.flash]}
					size={32}
					color="white"
				/>
			</TouchableOpacity>
		</View>
	);

	renderCameraViewBottomBar = () => (
		<View style={styles.bottomBar}>
			<View style={{ flex: 1, alignSelf: "flex-end" }}>
				<TouchableOpacity
					onPress={this.takePicture}
					style={{ alignSelf: "center" }}>
					<Ionicons name="ios-radio-button-on" size={70} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);

	renderCamera = () => (
		<View style={{ flex: 1 }}>
			<Camera
				ref={ref => {
					this.camera = ref;
				}}
				style={styles.camera}
				onCameraReady={this.collectPictureSizes}
				type={this.state.cameraType}
				autoFocus="on"
				zoom={0}
				whiteBalance="auto"
				ratio="16:9"
				//pictureSize={this.state.pictureSize}
				//onFacesDetected={
				//	this.state.faceDetecting ? this.onFacesDetected : undefined
				//}
				//onFaceDetectionError={this.onFaceDetectionError}
				//onBarCodeRead={
			>
				{this.renderCameraViewTopBar()}
				{this.renderCameraViewBottomBar()}
			</Camera>
		</View>
	);

	renderPicture = () => (
		<ImageBackground
			source={{
				uri: `${this.state.pictureTaken.uri}`
			}}
			style={{
				flex: 1,
				width: "100%",
				height: "100%"
			}}>
			<View style={[styles.bottomBar, { alignItems: "flex-end" }]}>
				<View style={{ flex: 1 }}>
					<TouchableOpacity
						onPress={this.discardPicture}
						style={{ alignSelf: "flex-start" }}>
						<Entypo name="circle-with-cross" size={50} color="white" />
					</TouchableOpacity>
				</View>
				<View style={{ flex: 1 }}>
					<TouchableOpacity
						onPress={this.savePicture}
						style={{ alignSelf: "flex-end" }}>
						<Ionicons name="md-send" size={50} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);

	discardPicture = () => {
		this.setState({ pictureTaken: null, renderCamera: true });
	};

	savePicture = async () => {
		const picturePath = `${
			FileSystem.documentDirectory
		}${Date.now()}-profilePic.jpg`;
		try {
			if (this.props.userData.profilePicPath) {
				await FileSystem.deleteAsync(`${this.props.profilePicturePath}`, {
					idempotent: true
				});
			}
			await FileSystem.moveAsync({
				from: this.state.pictureTaken.uri,
				to: picturePath
			});
			this.setState({
				pictureTaken: null,
				hasProfilePic: true
			});
			this.props.dispatch(ActionsCreators.setProfilePicturePath(picturePath));
		} catch (error) {
			console.log(error);
			this.setState({ pictureTaken: null, error: Messages.NO_SPACE_IN_DISK });
		}
	};

	stopCamera = () => {
		this.setState({ renderCamera: false });
	};

	toggleFacing = () =>
		this.setState({
			cameraType: this.state.cameraType === "back" ? "front" : "back"
		});

	toggleFlash = () =>
		this.setState({ flash: flashModeOrder[this.state.flash] });

	takePicture = async () => {
		if (this.camera) {
			try {
				const picture = await this.camera.takePictureAsync({
					quality: 0.5
				});
				this.setState({ pictureTaken: picture, renderCamera: false });
			} catch (error) {
				console.log(error);
				this.setState({ error: Messages.NO_SPACE_IN_DISK });
			}
		}
	};

	getImageDimensions = ({ width, height }, pictureSize) => {
		if (width > height) {
			const scaledHeight = (pictureSize * height) / width;
			return {
				width: pictureSize,
				height: scaledHeight
			};
		} else {
			const scaledWidth = (pictureSize * width) / height;
			return {
				width: scaledWidth,
				height: pictureSize
			};
		}
	};

	goToSettings = () => {
		this.props.navigation.navigate(Screens.Settings);
	};

	render() {
		if (this.state.pictureTaken) {
			return this.renderPicture();
		}
		if (this.state.renderCamera) {
			return this.renderCamera();
		}

		return (
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1
				}}>
				<RootWrapper>
					<View style={styles.photoContainer}>
						<Image
							source={
								this.state.hasProfilePic
									? {
											uri: `${this.props.profilePicturePath}`
									  }
									: require("../images/no_profile_picture.jpg")
							}
							style={{
								width: 100,
								height: 100,
								borderRadius: 100 / 2
							}}
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

						{this.state.error && (
							<GenericText error style={{ marginTop: 10 }}>
								{this.state.error}
							</GenericText>
						)}
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
