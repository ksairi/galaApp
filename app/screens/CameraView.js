import React from "react";
import {View, Alert, TouchableOpacity, ImageBackground} from "react-native";
import {connect} from "react-redux";
import {Camera} from "expo-camera";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import {Ionicons, MaterialIcons, Entypo} from "@expo/vector-icons";
import {Messages, Screens, AnalitycsEventsLabels} from "config/settings";
import ActionsCreators from "redux/actions";
import * as UserDataHelper from "helpers/UserDataHelper";
import * as ImageHelper from "helpers/ImageHelper";
import AnalyticsHelper from "helpers/AnalyticsHelper";

const styles = {
  camera: {
    flex: 1,
    justifyContent: "space-between",
  },
  topBar: {
    flex: 0.2,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: Constants.statusBarHeight + 5,
  },
  bottomBar: {
    paddingBottom: 5,
    backgroundColor: "transparent",
    alignSelf: "flex-end",
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
  toggleButton: {
    flex: 0.25,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 0,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
};

const flashModeOrder = {
  off: "on",
  on: "auto",
  auto: "torch",
  torch: "off",
};

const flashIcons = {
  off: "flash-off",
  on: "flash-on",
  auto: "flash-auto",
  torch: "highlight",
};
@connect((state) => ({
  userData: state.userData,
}))
export default class CameraView extends React.Component {
  state = {
    cameraType: Camera.Constants.Type.front,
    flash: "off",
    renderCamera: true,
    pictureTaken: null,
  };

  componentDidMount() {
    AnalyticsHelper.setPageHit(Screens.CameraView);
  }

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
      <View style={{flex: 1, alignSelf: "flex-end"}}>
        <TouchableOpacity
          onPress={this.takePicture}
          style={{alignSelf: "center"}}
        >
          <Ionicons name="ios-radio-button-on" size={70} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  renderCamera = () => (
    <View style={{flex: 1}}>
      <Camera
        ref={(ref) => {
          this.camera = ref;
        }}
        style={styles.camera}
        // onCameraReady={this.collectPictureSizes}
        type={this.state.cameraType}
        autoFocus="on"
        zoom={0}
        whiteBalance="auto"
        ratio="16:9"
        // pictureSize={this.state.pictureSize}
        // onFacesDetected={
        //	this.state.faceDetecting ? this.onFacesDetected : undefined
        // }
        // onFaceDetectionError={this.onFaceDetectionError}
        // onBarCodeRead={
      >
        {this.renderCameraViewTopBar()}
        {this.renderCameraViewBottomBar()}
      </Camera>
    </View>
  );

  renderPicture = () => (
    <ImageBackground
      source={{
        uri: `${this.state.pictureTaken.uri}`,
      }}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <View style={[styles.bottomBar, {alignItems: "flex-end"}]}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={this.discardPicture}
            style={{alignSelf: "flex-start"}}
          >
            <Entypo name="circle-with-cross" size={50} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={this.savePicture}
            style={{alignSelf: "flex-end"}}
          >
            <Ionicons name="md-send" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );

  discardPicture = () => {
    this.setState({pictureTaken: null, renderCamera: true});
  };

  savePicture = async () => {
    const picturePath = ImageHelper.getProfilePicturePath();

    try {
      if (this.props.profilePicture) {
        await FileSystem.deleteAsync(`${this.props.profilePicture.path}`, {
          idempotent: true,
        });
      }
      await FileSystem.moveAsync({
        from: this.state.pictureTaken.uri,
        to: picturePath,
      });
      this.setState({
        pictureTaken: null,
      });
      this.props.dispatch(
        ActionsCreators.setProfilePicture({path: picturePath, synched: false})
      );
      UserDataHelper.uploadProfilePicture(this.props.dispatch, {
        path: picturePath,
        userId: this.props.userData.userId,
      });
      this.props.navigation.navigate(Screens.Profile);
    } catch (error) {
      this.showAlert(Messages.NO_SPACE_IN_DISK);
    }
  };

  stopCamera = () => {
    this.props.navigation.navigate(Screens.Profile);
  };

  toggleFacing = () =>
    this.setState({
      cameraType: this.state.cameraType === "back" ? "front" : "back",
    });

  toggleFlash = () => this.setState({flash: flashModeOrder[this.state.flash]});

  showAlert(message) {
    Alert.alert("", message, [{text: "Aceptar", style: "cancel"}]);
  }

  takePicture = async () => {
    if (this.camera) {
      try {
        const picture = await this.camera.takePictureAsync({
          quality: 1,
        });
        this.setState({pictureTaken: picture, renderCamera: false});
        AnalyticsHelper.setEvent(AnalitycsEventsLabels.takeProfilePicture);
      } catch (error) {
        this.showAlert(Messages.NO_SPACE_IN_DISK);
      }
    }
  };

  getImageDimensions = ({width, height}, pictureSize) => {
    if (width > height) {
      const scaledHeight = (pictureSize * height) / width;
      return {
        width: pictureSize,
        height: scaledHeight,
      };
    }
    const scaledWidth = (pictureSize * width) / height;
    return {
      width: scaledWidth,
      height: pictureSize,
    };
  };

  render() {
    if (this.state.pictureTaken) {
      return this.renderPicture();
    }
    if (this.state.renderCamera) {
      return this.renderCamera();
    }
    return null;
  }
}
