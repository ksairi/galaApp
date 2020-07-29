import React, {useState, useCallback} from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
} from "react-native";
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
import {useFocusEffect} from "@react-navigation/native";

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

function CameraView({navigation, dispatch, userData, profilePicture}) {
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [flash, setFlash] = useState("off");
  const [renderCamera, setRenderCamera] = useState(true);
  const [pictureTaken, setPictureTaken] = useState(null);
  let camera;
  useFocusEffect(
    useCallback(() => {
      setCameraType(Camera.Constants.Type.front);
      setFlash("off");
      setRenderCamera(true);
      setPictureTaken(null);
      AnalyticsHelper.setPageHit(Screens.CameraView);
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          navigation.navigate(Screens.Profile);
          return true;
        }
      );
      return () => {
        setRenderCamera(false);
        backHandler.remove();
      };
    }, [])
  );

  const stopCamera = () => {
    navigation.navigate(Screens.Profile);
  };

  const toggleFacing = () =>
    setCameraType(cameraType === "back" ? "front" : "back");

  const toggleFlash = () => setFlash(flashModeOrder[flash]);

  const showAlert = (message) => {
    Alert.alert("", message, [{text: "Aceptar", style: "cancel"}]);
  };

  const takePicture = async () => {
    if (camera) {
      try {
        const picture = await camera.takePictureAsync({
          quality: 1,
        });
        setPictureTaken(picture);
        setRenderCamera(false);
        AnalyticsHelper.setEvent(AnalitycsEventsLabels.takeProfilePicture);
      } catch (error) {
        showAlert(Messages.NO_SPACE_IN_DISK);
      }
    }
  };

  const discardPicture = () => {
    setPictureTaken(null);
    setRenderCamera(true);
  };

  const savePicture = async () => {
    const picturePath = ImageHelper.getProfilePicturePath();

    try {
      if (profilePicture) {
        await FileSystem.deleteAsync(`${profilePicture.path}`, {
          idempotent: true,
        });
      }
      await FileSystem.moveAsync({
        from: pictureTaken.uri,
        to: picturePath,
      });
      setPictureTaken(null);
      dispatch(
        ActionsCreators.setProfilePicture({path: picturePath, synched: false})
      );
      UserDataHelper.uploadProfilePicture(dispatch, {
        path: picturePath,
        userId: userData.userId,
      });
      navigation.navigate(Screens.Profile);
    } catch (error) {
      showAlert(Messages.NO_SPACE_IN_DISK);
    }
  };

  const renderCameraViewTopBar = () => (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.toggleButton} onPress={stopCamera}>
        <Ionicons name="md-arrow-back" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleFacing}>
        <Ionicons name="ios-reverse-camera" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleFlash}>
        <MaterialIcons name={flashIcons[flash]} size={32} color="white" />
      </TouchableOpacity>
    </View>
  );

  const renderCameraViewBottomBar = () => (
    <View style={styles.bottomBar}>
      <View style={{flex: 1, alignSelf: "flex-end"}}>
        <TouchableOpacity onPress={takePicture} style={{alignSelf: "center"}}>
          <Ionicons name="ios-radio-button-on" size={70} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const doRenderCamera = () => (
    <View style={{flex: 1}}>
      <Camera
        ref={(ref) => {
          camera = ref;
        }}
        style={styles.camera}
        type={cameraType}
        autoFocus="on"
        zoom={0}
        whiteBalance="auto"
        ratio="16:9"
      >
        {renderCameraViewTopBar()}
        {renderCameraViewBottomBar()}
      </Camera>
    </View>
  );

  const renderPicture = () => (
    <ImageBackground
      source={{
        uri: `${pictureTaken.uri}`,
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
            onPress={discardPicture}
            style={{alignSelf: "flex-start"}}
          >
            <Entypo name="circle-with-cross" size={50} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={savePicture}
            style={{alignSelf: "flex-end"}}
          >
            <Ionicons name="md-send" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );

  if (pictureTaken) {
    return renderPicture();
  }
  if (renderCamera) {
    return doRenderCamera();
  }
  return null;
}

export default connect((state) => ({
  userData: state.userData,
  profilePicture: state.profilePicture,
}))(CameraView);
