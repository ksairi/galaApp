import React from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import {Screens, Messages} from "config/settings";
import * as LoginHelper from "helpers/LoginHelper";
import ActionsCreators from "redux/actions";
import * as NotificationsHelper from "helpers/NotificationsHelper";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import {Text} from "react-native-animatable-promise";
import {genericBackgroundColor} from "components/styles";
import * as withEnv from "utils/env";

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: genericBackgroundColor,
    paddingLeft: 10,
    paddingRight: 10,
  },
};

@connect((state) => ({
  isAppsFirstTime: state.isAppsFirstTime,
  isLoggedIn: state.isLoggedIn,
  userId: state.userData.userId,
  password: state.userData.password,
  loginSynchedDataParameters: state.loginSynchedDataParameters,
  deviceId: state.deviceId,
  messages: state.messages,
  hasResetFirstPassword: state.hasResetFirstPassword,
  userData: state.userData,
  newMemberData: state.newMemberData,
  routines: state.routines,
}))
export default class CheckUserActivity extends React.Component {
  static isInLoggingProcess = false;

  constructor(props) {
    super(props);
    this.checkUserStatus();
  }

  componentDidMount() {
    AnalyticsHelper.setPageHit(Screens.CheckUserActivity);
  }

  checkUserStatus = async () => {
    if (
      this.props.isAppsFirstTime ||
      (withEnv.isWebInMobile() &&
        !this.props.navigation?.state?.params?.checkUserActivity)
    ) {
      this.props.navigation.navigate(Screens.Welcome);
    } else if (this.props.isLoggedIn) {
      try {
        CheckUserActivity.isInLoggingProcess = true;
        const deviceId = this.props.deviceId
          ? this.props.deviceId
          : await NotificationsHelper.getDeviceId(this.props.dispatch);
        await LoginHelper.login(
          this.props.userId,
          this.props.password,
          deviceId,
          this.props.loginSynchedDataParameters,
          this.props.messages,
          this.props.dispatch,
          {
            data: {
              userData: this.props.userData,
              hasResetFirstPassword: this.props.hasResetFirstPassword,
              newMemberData: this.props.newMemberData,
              routines: this.props.routines,
            },
          }
        );
        if (this.props.hasResetFirstPassword) {
          this.props.navigation.navigate(Screens.HomeStack);
        } else {
          this.props.dispatch(
            ActionsCreators.setInResetFirstPasswordMode(true)
          );
          this.props.navigation.navigate(Screens.ResetPassword);
        }
      } catch (error) {
        if (Messages.CHECK_INTERNET_CONNECTION === error) {
          // offline login
          this.props.navigation.navigate(Screens.HomeStack);
        } else {
          this.props.navigation.navigate(Screens.LoginStack);
        }
      }
    } else {
      this.props.navigation.navigate(Screens.LoginStack);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {CheckUserActivity.isInLoggingProcess && (
          <Text
            useNativeDriver
            animation="pulse"
            duration={1500}
            iterationCount="infinite"
            style={{
              fontFamily: "lato-bold",
              fontSize: 20,
              color: "white",
            }}
          >
            Qué bueno que volviste{" "}
            {this.props.userData && this.props.userData.name
              ? this.props.userData.name.split(" ")[0]
              : null}
            !
          </Text>
        )}
      </View>
    );
  }
}
