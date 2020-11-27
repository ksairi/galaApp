import React from "react";
import {
  View,
  TouchableOpacity,
  AppState,
  Text,
  Platform,
  Dimensions,
} from "react-native";
import {connect} from "react-redux";
import GScrollView from "components/presentationals/GenericScrollView";
import RootWrapper from "components/presentationals/RootWrapper";
import CentredWrapper from "components/presentationals/CentredWrapper";
import ActionsCreators from "redux/actions";
import {Screens} from "config/settings";
import Icon from "helpers/ImageHelper";
import GenericText from "components/presentationals/GenericText";
import Footer from "components/presentationals/Footer";
import * as UserDataHelper from "helpers/UserDataHelper";
import * as Animatable from "react-native-animatable-promise";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import Slider from "components/presentationals/Slider";
import TimetableItem from "components/presentationals/TimetableItem";
import RoutineItem from "components/presentationals/RoutineItem";
import Alert from "components/presentationals/Alert";
import moment from "moment";
import {isMemberActive} from "utils/userData";
import {getSectionsData, isRestrictedLogin} from "helpers/LoginHelper";
import RestrictedUserData from "components/presentationals/RestrictedUserData";

const styles = {
  buttonsContainer: {
    flex: -1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonWrapper: {
    height: 100,
    backgroundColor: "#12194d",
    justifyContent: "center",
    padding: 5,
    marginRight: 10,
    marginTop: 10,
    width: 100,
  },
  label: {
    flex: -1,
    fontSize: 10,
    fontFamily: "brother-1816-bold",
    marginTop: 5,
  },
  carouselDataContainer: {
    flex: 1,
    height: 130,
    width: 250,
  },
  promotionsContainer: {
    marginTop: 30,
    marginBottom: 60,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  sliderTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "lato-bold",
    fontSize: 20,
    color: "#ffffff",
    paddingRight: 35,
  },
  link: {
    fontFamily: "lato-regular",
    fontSize: 17,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#00ffb4",
  },
};

const AnimatedSlider = Animatable.createAnimatableComponent(Slider);

@connect((state) => ({
  userData: state.userData,
  currentHomeDrawerOption: state.currentHomeDrawerOption,
  newMemberData: state.newMemberData,
  routines: state.routines,
  timetable: state.timetable,
  lastDateShowingFreePassEnding: state.lastDateShowingFreePassEnding,
}))
export default class Home extends React.Component {
  state = {
    appState: AppState.currentState,
    alertMessage: null,
  };

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

  componentDidMount() {
    AnalyticsHelper.setPageHit(Screens.Home);
    AppState.addEventListener("change", this._handleAppStateChange);
    if (this.props.currentHomeDrawerOption !== "") {
      this.props.navigation.navigate(this.props.currentHomeDrawerOption);
      this.props.dispatch(ActionsCreators.setCurrentHomeDrawerOption(""));
    }
    const {freePassEndDate} = this.props.userData;
    const freePassDaysLeft =
      freePassEndDate &&
      moment(freePassEndDate, "DD/MM/YYYY").diff(moment(), "days");

    if (
      freePassDaysLeft > 0 &&
      freePassDaysLeft <= 3 &&
      (!this.props.lastDateShowingFreePassEnding ||
        moment().diff(this.props.lastDateShowingFreePassEnding, "days") !== 0)
    ) {
      this.props.dispatch(
        ActionsCreators.setLastDateShowingFreePassEnding(moment())
      );
      this.setState({
        alertMessage: `Te quedan ${freePassDaysLeft} días de tu Free Pass. ¿Querés renovarlo?`,
      });
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  onIconPressed = (screen, params) => () => {
    this.props.navigation.navigate(screen, {screen, params});
  };

  goToScreen = (screen) => () => {
    this.props.navigation.navigate(screen);
  };

  render() {
    const todayClassesData = this.props.timetable[
      new Date().getDay() === 0 ? new Date().getDay() : new Date().getDay() - 1
    ].data;
    const activeRoutine = this.props.routines.filter(
      (routine) => routine.isActive
    )[0];
    return (
      <GScrollView>
        <RootWrapper style={{paddingTop: 10}}>
          <CentredWrapper>
            <RestrictedUserData userData={this.props.userData} />
            {!isRestrictedLogin(this.props.userData.password) && (
              <>
                <View style={styles.sliderTitleWrapper}>
                  <Text style={styles.title}>Clases</Text>
                  <TouchableOpacity
                    onPress={this.goToScreen(Screens.Timetable)}
                  >
                    <Text style={styles.link}>Ver &gt;</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.carouselDataContainer}>
                  <AnimatedSlider
                    useNativeDriver
                    animation="zoomIn"
                    items={todayClassesData}
                    Component={TimetableItem}
                  />
                </View>
                {isMemberActive(this.props) &&
                  !!activeRoutine &&
                  activeRoutine.ejercicios !== null && (
                    <>
                      <View style={styles.sliderTitleWrapper}>
                        <Text style={styles.title}>Mis rutinas</Text>
                        <TouchableOpacity
                          onPress={this.goToScreen(Screens.Routines)}
                        >
                          <Text style={styles.link}>Empezar &gt;</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.carouselDataContainer}>
                        <AnimatedSlider
                          useNativeDriver
                          animation="zoomIn"
                          items={activeRoutine.ejercicios}
                          Component={RoutineItem}
                        />
                      </View>
                    </>
                  )}
              </>
            )}
            <Animatable.View
              useNativeDriver
              animation="slideInRight"
              style={styles.buttonsContainer}
            >
              {getSectionsData(this.props.userData.password).map(
                (sectionData, index) => {
                  if (
                    (sectionData.screen !== Screens.NewMember &&
                      sectionData.screen !== Screens.PayMonthlyFee &&
                      !sectionData.requiresActiveMember) ||
                    (sectionData.screen === Screens.NewMember &&
                      this.state.freeEntryDaysLeft > 0) ||
                    (sectionData.requiresActiveMember &&
                      isMemberActive(this.props)) ||
                    (sectionData.requiresFreePlan &&
                      this.props.userData.freePassEndDate)
                  ) {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={
                          sectionData.onPress
                            ? () => sectionData.onPress()
                            : this.onIconPressed(
                                sectionData.screen,
                                sectionData.params
                              )
                        }
                      >
                        <View style={styles.buttonWrapper}>
                          <View
                            style={{
                              alignItems: "center",
                            }}
                          >
                            {sectionData.IconComponent ? (
                              <sectionData.IconComponent
                                name={sectionData.icon}
                                style={sectionData.homeStyle}
                              />
                            ) : (
                              <Icon
                                name={sectionData.icon}
                                style={sectionData.homeStyle}
                              />
                            )}
                            <GenericText style={styles.label}>
                              {sectionData.label}
                            </GenericText>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                }
              )}
            </Animatable.View>
            <Footer />
            <Alert
              show={!!this.state.alertMessage}
              message={this.state.alertMessage}
              onConfirmPressed={() => {
                this.setState({alertMessage: null});
                this.props.navigation.navigate(Screens.PayMonthlyFee);
              }}
              showCancelButton={true}
              onCancelPressed={() => {
                this.setState({alertMessage: null});
              }}
              messageStyle={{fontSize: 20}}
              confirmButtonTextStyle={{fontSize: 20}}
              cancelButtonTextStyle={{fontSize: 20}}
              contentContainerStyle={
                Platform.OS === "web"
                  ? {
                      left: __DEV__ ? Dimensions.get("window").width / 2 : 1,
                      bottom: 400,
                      width: 200,
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
          </CentredWrapper>
        </RootWrapper>
      </GScrollView>
    );
  }
}
