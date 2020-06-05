/* eslint-disable no-alert */
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
} from "react-native";
import {connect} from "react-redux";
import RootWrapper from "components/presentationals/RootWrapper";
import GScrollView from "components/presentationals/GenericScrollView";
import ActionsCreators from "redux/actions";
import {Screens, AnalitycsEventsLabels} from "config/settings";
import {synchMemberProperties} from "helpers/UserDataHelper";
import AnalyticsHelper from "helpers/AnalyticsHelper";

const styles = {
  settingsWrapper: {flex: 0.4},
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

@connect((state) => ({
  receiveNotifications: state.receiveNotifications,
  userId: state.userData.userId,
}))
export default class Settings extends React.Component {
  logout = () => {
    if (Platform.OS !== "web") {
      Alert.alert(
        "",
        "¿Cerrar sesión?",
        [
          {text: "No", style: "cancel"},
          {
            text: "Sí",
            onPress: () => {
              AnalyticsHelper.setEvent(AnalitycsEventsLabels.signOut);

              this.props.navigation.navigate(Screens.LoginStack);
              this.props.dispatch(ActionsCreators.logout());
            },
          },
        ],
        {cancelable: true}
      );
      // eslint-disable-next-line no-restricted-globals
    } else if (window.confirm("¿Cerrar sesión?")) {
      AnalyticsHelper.setEvent(AnalitycsEventsLabels.signOut);
      this.props.navigation.navigate(Screens.LoginStack);
      this.props.dispatch(ActionsCreators.logout());
    }
  };

  componentDidMount() {
    AnalyticsHelper.setPageHit(Screens.Settings);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.receiveNotifications != null) {
      return {receiveNotifications: nextProps.receiveNotifications.value};
    }
    return prevState;
  }

  onValueChange = (value) => {
    const values = {
      value,
      synched: false,
    };
    this.props.dispatch(ActionsCreators.setReceiveNotifications(values));
    synchMemberProperties(this.props.dispatch, {
      userId: this.props.userId,
      data: {receiveNotifications: values},
    });
  };

  render() {
    return (
      <GScrollView>
        <RootWrapper>
          <View style={styles.settingsWrapper}>
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Recibir Notificaciones</Text>
              <Switch
                style={{alignSelf: "flex-end"}}
                value={
                  this.props.receiveNotifications == null
                    ? true
                    : this.props.receiveNotifications.value
                }
                ios_backgroundColor="grey"
                trackColor="green"
                onValueChange={(value) => {
                  this.onValueChange(value);
                }}
              />
            </View>
            <TouchableOpacity style={styles.settingItem} onPress={this.logout}>
              <Text style={styles.settingText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </RootWrapper>
      </GScrollView>
    );
  }
}
