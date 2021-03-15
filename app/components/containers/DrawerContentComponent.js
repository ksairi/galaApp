import React from "react";
import {TouchableOpacity, AppState} from "react-native";
import {connect} from "react-redux";
import {Screens} from "config/settings";
import DrawerItem from "components/presentationals/DrawerItem";
import Logo from "components/presentationals/Logo";
import {genericBackgroundColor} from "components/styles";
import * as UserDataHelper from "helpers/UserDataHelper";
import {isMemberActive} from "utils/userData";
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {getSectionsData} from "helpers/LoginHelper";

const styles = {
  drawerItemsWrapper: {
    paddingTop: 20,
    backgroundColor: genericBackgroundColor,
    alignItems: "flex-start",
    paddingLeft: 5,
    paddingBottom: 5,
  },
  headerIcon: {
    flex: 1,
    fontSize: 40,
  },
};

@connect((state) => ({
  newMemberData: state.newMemberData,
  newMessagesCount: state.newMessagesCount,
  routines: state.routines,
  userData: state.userData,
}))
export default class DrawerContentComponent extends React.PureComponent {
  state = {
    appState: AppState.currentState,
    freeEntryDaysLeft: null,
  };

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.newMemberData) {
      return {
        freeEntryDaysLeft: UserDataHelper.getFreeEntryDaysLeft(
          nextProps.newMemberData.freeEntryData.date
        ),
      };
    }
    return prevState;
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if (this.props.newMemberData) {
        const freeEntryDaysLeft = UserDataHelper.getFreeEntryDaysLeft(
          this.props.newMemberData.freeEntryData.date
        );
        this.setState({
          freeEntryDaysLeft,
        });
      }
    }
    this.setState({appState: nextAppState});
  };

  onPress = (screen, params) => () => {
    this.props.navigation.navigate(screen, {screen, params});
  };

  navigateToHome = (screen) => () => {
    this.props.navigation.navigate(screen);
  };

  render() {
    return (
      <DrawerContentScrollView
        style={{backgroundColor: genericBackgroundColor}}
      >
        <TouchableOpacity
          style={{flex: 1, flexDirection: "row", marginLeft: 13}}
          onPress={this.navigateToHome(Screens.Home)}
        >
          <Logo style={styles.headerIcon} />
        </TouchableOpacity>
        {getSectionsData(this.props.userData.password).map(
          (drawerItem, index) => {
            if (
              (drawerItem.screen !== Screens.NewMember &&
                drawerItem.screen !== Screens.PayMonthlyFee &&
                !drawerItem.requiresActiveMember) ||
              (drawerItem.screen === Screens.NewMember &&
                this.state.freeEntryDaysLeft > 0) ||
              (drawerItem.requiresActiveMember && isMemberActive(this.props)) ||
              (drawerItem.requiresFreePlan &&
                this.props.userData.freePassEndDate) ||
              (!isMemberActive(this.props) && drawerItem.requiresNoActiveMember)
            ) {
              return (
                <DrawerItem
                  key={index}
                  active={this.props.activeItemKey === drawerItem.screen}
                  icon={drawerItem.icon}
                  label={drawerItem.label}
                  screen={drawerItem.screen}
                  onPress={
                    drawerItem.onPress
                      ? () => drawerItem.onPress()
                      : this.onPress(drawerItem.screen, drawerItem.params)
                  }
                  style={drawerItem.drawerStyle}
                  IconComponent={drawerItem.IconComponent}
                  labelExtraData={
                    drawerItem.label === "MENSAJES" &&
                    this.props.newMessagesCount > 0
                      ? ` (${this.props.newMessagesCount})`
                      : null
                  }
                />
              );
            }
          }
        )}
      </DrawerContentScrollView>
    );
  }
}
