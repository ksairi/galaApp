import React from "react";
import {Platform, Alert} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  AnalitycsEventsLabels,
  Notifications as NotificationsData,
  // Screens,
} from "config/settings";

import AppRoutes from "navigation";
import * as NetworkHelper from "helpers/NetworkHelper";
import RootView from "components/containers/RootView";
import {sendUnsentMessages} from "helpers/MessagesHelper";
import * as UserDataHelper from "helpers/UserDataHelper";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import ActionsCreators from "./actions";
import StatusBar from "components/presentationals/StatusBar";
// import {navigate} from "navigation";
@connect(
  (state) => ({
    userId: state.userData.userId,
    newMemberData: state.newMemberData,
    messages: state.messages,
    currentHomeDrawerOption: state.currentHomeDrawerOption,
    isLoggedIn: state.isLoggedIn,
    isAppsFirstTime: state.isAppsFirstTime,
    profilePicture: state.profilePicture,
    receiveNotifications: state.receiveNotifications,
    orientation: state.currentOrientation,
    statusBarIsHidden: state.statusBarIsHidden,
  }),
  (dispatch) => ({
    dispatch,
    ...bindActionCreators(ActionsCreators, dispatch),
  })
)
export default class AppContainer extends React.Component {
  static unsubscribe;

  static interval;

  state = {cancelTime: null};

  constructor(props) {
    super(props);
    props.dispatch(ActionsCreators.setIsInSession(false));
    props.dispatch(ActionsCreators.setGoToMobileWebLogin(false));
  }

  showAlert = () => {
    Alert.alert(
      "Nueva versión disponible",
      "Se cerrará y abrirá la app para instalarla rapidamente. Continuar?",
      [
        {
          text: "Cancelar",
          onPress: () => this.setState({cancelTime: Date.now()}),
          style: "cancel",
        },
        {text: "OK", onPress: () => Updates.reloadAsync()},
      ],
      {cancelable: false}
    );
  };

  componentDidMount() {
    Notifications.addNotificationReceivedListener(this.notificationReceived);
    // Notifications.addNotificationResponseReceivedListener(
    //   this.notificationResponseReceived
    // );
    if (Platform.OS !== "web") {
      AppContainer.unsubscribe = NetInfo.addEventListener(
        this.handleConnectivityChange
      );
    }
    AppContainer.interval = setInterval(async () => {
      if (!__DEV__) {
        const response = await Updates.checkForUpdateAsync();
        if (
          response.isAvailable &&
          (!this.state.cancelTime ||
            (Date.now() - this.state.cancelTime) / 1000 / 60 >= 30)
        ) {
          this.showAlert();
        }
      }
    }, 1000 * 60 * 60 * 12);
  }

  componentWillUnmount() {
    Notifications.removeAllNotificationListeners();
    if (Platform.OS !== "web") {
      AppContainer.unsubscribe();
    }
    clearInterval(AppContainer.interval);
  }

  setAnalyticEvent = (data) => {
    AnalyticsHelper.setEvent(
      `${AnalitycsEventsLabels.notificationReceivedOf} ${
        AnalitycsEventsLabels[
          Object.keys(data).filter(
            (key) =>
              key !== NotificationsData.idFieldName &&
              key !== NotificationsData.handlerFieldName &&
              key !== NotificationsData.destScreenFieldName
          )
        ]
      }`
    );
  };

  notificationReceived = async ({
    request: {
      content: {data},
    },
  }) => {
    const messagesCount = data.messages.length;
    this.props.dispatch(
      ActionsCreators.setNotificationsText("Tenés nuevos mensajes!")
    );
    this.props.dispatch(ActionsCreators.setNewMessagesCount(messagesCount));
    const badgeNumber = await Notifications.getBadgeNumberAsync();
    await Notifications.setBadgeNumberAsync(badgeNumber + messagesCount);
    this.setAnalyticEvent(data);
  };

  // notificationResponseReceived = async ({
  //   notification: {
  //     request: {
  //       content: {data},
  //     },
  //   },
  // }) => {
  //    NOT WORKING! this.props is null
  //   this.setAnalyticEvent(data);
  //   if (isReadyRef.current && this.props.isLoggedIn) {
  //     const messagesCount = data.messages.length;
  //     this.props.dispatch(ActionsCreators.setNewMessagesCount(messagesCount));
  //     const badgeNumber = await Notifications.getBadgeNumberAsync();
  //     await Notifications.setBadgeNumberAsync(badgeNumber + messagesCount);
  //     navigate(Screens.Messages);
  //   }
  //   this.props.dispatch(ActionsCreators.setNewMessagesCount(messagesCount));
  // };

  handleConnectivityChange = async (connectionInfo) => {
    if (await NetworkHelper.isConnected(connectionInfo)) {
      if (this.props.isLoggedIn) {
        this.props.dispatch(ActionsCreators.fetchUserStore());
        sendUnsentMessages(
          this.props.userId,
          this.props.messages,
          this.props.dispatch
        );
        if (this.props.profilePicture && !this.props.profilePicture.synched) {
          UserDataHelper.uploadProfilePicture(this.props.dispatch, {
            userId: this.props.userId,
            path: this.props.profilePicture.path,
          });
        }
        UserDataHelper.synchMemberProperties(this.props.dispatch, {
          userId: this.props.userId,
          data: {receiveNotifications: this.props.receiveNotifications},
        });
      }
    }
  };

  render() {
    return (
      <RootView>
        <StatusBar
          backgroundColor="#5E8D48"
          barStyle="light-content"
          hidden={
            (this.props.statusBarIsHidden && Platform.OS !== "ios") ||
            (Platform.OS === "ios" && this.props.orientation === "landscape")
          }
        />
        <AppRoutes />
      </RootView>
    );
  }
}
