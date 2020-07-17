import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Dimensions,
  Platform,
} from "react-native";
import {connect} from "react-redux";
import RootWrapper from "components/presentationals/RootWrapper";
import GScrollView from "components/presentationals/GenericScrollView";
import ActionsCreators from "redux/actions";
import {Screens, AnalitycsEventsLabels} from "config/settings";
import {synchMemberProperties} from "helpers/UserDataHelper";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import Alert from "components/presentationals/Alert";

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

@connect((state) => ({
  receiveNotifications: state.receiveNotifications,
  userId: state.userData.userId,
}))
export default class Settings extends React.Component {
  state = {showAlert: false};

  logout = () => {
    this.setState({showAlert: true});
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
          <Alert
            show={!!this.state.showAlert}
            message="¿Cerrar sesión?"
            showCancelButton={true}
            onConfirmPressed={() => {
              this.props.dispatch(ActionsCreators.setIsInSession(false));
              this.props.dispatch(ActionsCreators.logout());
              this.setState({showAlert: false});
              AnalyticsHelper.setEvent(AnalitycsEventsLabels.signOut);
            }}
            onCancelPressed={() => {
              this.setState({showAlert: false});
            }}
            contentContainerStyle={
              Platform.OS === "web"
                ? {
                    left: Dimensions.get("window").width / 2,
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
}
