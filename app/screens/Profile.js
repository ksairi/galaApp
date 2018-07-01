import React from "react";
import {
	View,
	ScrollView,
	Text,
	Image,
	TouchableOpacity,
	ImageBackground
} from "react-native";
import { Camera, Permissions, Constants, FileSystem } from "expo";
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
import { Messages, Paths } from "/config/settings";
import GenericText from "/components/presentationals/GenericText";
import { ActionsCreators } from "/redux/actions/";
const styles = {
	photoContainer: { flex: 1, alignItems: "center" },
	userDataContainer: {
		flex: 1
	},
	userDataRow: {
		flexDirection: "row",
		flex: 1
	},
	label: {
		fontFamily: "lato-regular",
		fontSize: 18,
		color: "white",
		textAlign: "left"
	},
	userData: {
		fontFamily: "brother-1816-bold",
		fontSize: 18,
		color: "white",
		flex: 1,
		textAlign: "right"
	},
	footerContainer: {
		flex: 0.5,
		flexDirection: "row"
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
		paddingTop: Constants.statusBarHeight / 2
	},
	bottomBar: {
		paddingBottom: 5,
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		justifyContent: "space-between",
		flex: 0.12,
		flexDirection: "row"
	},
	toggleButton: {
		flex: 0.25,
		height: 40,
		marginHorizontal: 2,
		marginBottom: 10,
		marginTop: 20,
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
	userData: state.userData
}))
export default class Profile extends React.Component {
	state = {
		hasCameraPermission: null,
		cameraType: Camera.Constants.Type.front,
		flash: "off",
		hasProfilePic: false,
		renderCamera: false,
		pictureTaken: null
	};

	componentDidMount = () => {
		Expo.FileSystem.getInfoAsync(this.props.userData.profilePicPath)
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
			<View style={{ flex: 0.4 }}>
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
				width: "100%",
				height: "100%"
			}}>
			<View style={styles.bottomBar}>
				<View style={{ flex: 0.4 }}>
					<TouchableOpacity
						onPress={this.discardPicture}
						style={{ alignSelf: "center" }}>
						<Entypo name="circle-with-cross" size={70} color="white" />
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity
						onPress={this.savePicture}
						style={{ alignSelf: "center" }}>
						<Ionicons name="md-send" size={70} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);

	discardPicture = () => {
		this.setState({ pictureTaken: null, renderCamera: true });
	};

	savePicture = async () => {
		console.log(this.state.pictureTaken.uri);
		try {
			await FileSystem.moveAsync({
				from: this.state.pictureTaken.uri,
				to: Paths.PROFILE_PICTURE
			});
			this.setState({ pictureTaken: null, hasProfilePic: true });
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
											uri: `${this.props.userData.profilePicPath}`
									  }
									: require("../images/login.jpg")
							}
							style={{
								width: 100,
								height: 100
							}}
						/>
						<TouchableOpacity onPress={this.useCamera}>
							<View style={{ backgroundColor: "white" }}>
								<FontAwesome name="camera-retro" size={32} />
							</View>
						</TouchableOpacity>
						{this.state.error && (
							<GenericText error>{this.state.error}</GenericText>
						)}
					</View>
					<Text
						style={{
							fontFamily: "brother-1816-bold",
							fontSize: 22,
							flex: 0.6,
							color: "white"
						}}>
						MI INFORMACIÓN
					</Text>
					<View style={styles.userDataContainer}>
						<View style={styles.userDataRow}>
							<Text style={styles.label}>Nombre</Text>
							<Text style={styles.userData}>{this.props.userData.name}</Text>
						</View>
						{
							/*this.props.userData.mail &&*/ <View style={styles.userDataRow}>
								<Text style={styles.label}>Email</Text>
								<Text style={[styles.userData, { fontSize: 16 }]}>
									marianoksairi@gmail.com
								</Text>
							</View>
						}
						{
							/*this.props.userData.phoneNumber &&*/ <View
								style={styles.userDataRow}>
								<Text style={styles.label}>Teléfono</Text>
								<Text style={styles.userData}>49832325</Text>
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
							}}>
							CONFIGURACIÓN
						</RkButton>
					</View>
					<View style={styles.footerContainer}>
						<Footer />
					</View>
				</RootWrapper>
			</ScrollView>
		);
	}
}
