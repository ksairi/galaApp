import React, {useState, useCallback} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Dimensions,
  Platform,
  BackHandler,
} from "react-native";
import {connect} from "react-redux";
import RootWrapper from "components/presentationals/RootWrapper";
import GScrollView from "components/presentationals/GenericScrollView";
import ActionsCreators from "redux/actions";
import {Screens, AnalitycsEventsLabels} from "config/settings";
import {synchMemberProperties} from "helpers/UserDataHelper";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import Alert from "components/presentationals/Alert";
import {useFocusEffect} from "@react-navigation/native";

const styles = {
  settingsWrapper: {flex: 0.4, marginTop: 10},
  settingItem: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  settingText: {
    fontFamily: "lato-regular",
    fontSize: 18,
    alignSelf: "flex-start",
    color: "white",
    flex: 1,
  },
};

function Settings({dispatch, userId, receiveNotifications, navigation}) {
  const [showAlert, setShowAlert] = useState(false);

  const logout = () => {
    setShowAlert(true);
  };
  useFocusEffect(
    useCallback(() => {
      AnalyticsHelper.setPageHit(Screens.Settings);
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          navigation.navigate(Screens.Profile);
          return true;
        }
      );
      return () => backHandler.remove();
    }, [userId])
  );

  const onValueChange = (value) => {
    const values = {
      value,
      synched: false,
    };
    dispatch(ActionsCreators.setReceiveNotifications(values));
    synchMemberProperties(dispatch, {
      userId,
      data: {receiveNotifications: values},
    });
  };
  return (
    <GScrollView>
      <RootWrapper>
        <View style={styles.settingsWrapper}>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Recibir Notificaciones</Text>
            <Switch
              style={{alignSelf: "flex-end"}}
              value={
                receiveNotifications == null ? true : receiveNotifications.value
              }
              ios_backgroundColor="grey"
              trackColor="green"
              onValueChange={(value) => {
                onValueChange(value);
              }}
            />
          </View>
          <TouchableOpacity style={styles.settingItem} onPress={logout}>
            <Text style={styles.settingText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
        <Alert
          show={!!showAlert}
          message="¿Cerrar sesión?"
          showCancelButton={true}
          onConfirmPressed={() => {
            dispatch(ActionsCreators.setIsInSession(false));
            dispatch(ActionsCreators.logout());
            setShowAlert(false);
            AnalyticsHelper.setEvent(AnalitycsEventsLabels.signOut);
          }}
          onCancelPressed={() => {
            setShowAlert(false);
          }}
          contentContainerStyle={
            Platform.OS === "web"
              ? {
                  left: __DEV__ ? Dimensions.get("window").width / 2 : 1,
                }
              : {}
          }
          overlayStyle={
            Platform.OS === "web"
              ? {
                  backgroundColor: "transparent",
                }
              : {}
          }
        />
      </RootWrapper>
    </GScrollView>
  );
}
export default connect((state) => ({
  receiveNotifications: state.receiveNotifications,
  userId: state.userData.userId,
}))(Settings);
