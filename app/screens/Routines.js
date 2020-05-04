import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import GScrollView from "components/presentationals/GenericScrollView";
import Button from "components/presentationals/GenericButton";
import {connect} from "react-redux";
import RootWrapper from "components/presentationals/RootWrapper";
import GenericText from "components/presentationals/GenericText";
import {Screens, AnalitycsEventsLabels} from "config/settings";
import ActionsCreators from "redux/actions";
import * as Animatable from "react-native-animatable-promise";
import AnalyticsHelper from "helpers/AnalyticsHelper";

const styles = {
  routinesWrapper: {
    justifyContent: "center",
    marginTop: 30,
  },
};

@connect((state) => ({
  routines: state.routines,
}))
export default class Routines extends React.Component {
  componentDidMount() {
    AnalyticsHelper.setPageHit(Screens.Routines);
  }

  seeRoutine = (routine) => () => {
    this.props.dispatch(ActionsCreators.setCurrentRoutine(routine));
    this.props.navigation.navigate(Screens.RoutineDetail);
  };

  showIntroVideo = (url, title) => () => {
    AnalyticsHelper.setEvent(AnalitycsEventsLabels.routinesVideos);
    this.props.navigation.navigate(Screens.VideoPlayer, {
      url,
      backScreen: Screens.Routines,
      title,
    });
  };

  showTitle = () => (
    <Animatable.View
      useNativeDriver
      animation="slideInDown"
      duration={1500}
      style={{
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 30,
      }}
    >
      <GenericText
        style={{
          fontSize: 26,
          fontFamily: "brother-1816-bold",
          alignSelf: "center",
        }}
      >
        TUS RUTINAS
      </GenericText>
    </Animatable.View>
  );

  isRoutineDescLong = (description) => description.length > 30;

  showRoutines = (pRoutines, title) => {
    const routines = pRoutines.map((routine, index) => (
      <Animatable.View
        useNativeDriver
        animation={index % 2 === 0 ? "slideInLeft" : "slideInRight"}
        duration={1500}
        key={index}
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginTop: 15,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          buttonStyle={{
            backgroundColor: "#12194d",
            flex: 2,
            marginLeft: 70,
            justifyContent: "flex-start",
            height: 50,
          }}
          textStyle={{
            fontSize: 13,
            fontFamily: "brother-1816-bold",
          }}
          onPress={this.seeRoutine(routine)}
          text={routine.description.toUpperCase()}
        />

        {routine.link !== "" && routine.link !== null && (
          <TouchableOpacity
            style={{flex: 0.2, marginLeft: 5}}
            onPress={this.showIntroVideo(
              routine.link.toLowerCase(),
              routine.description
            )}
          >
            <Text
              style={{
                fontSize: 13,
                fontFamily: "lato-regular",
                alignSelf: "center",
                color: "white",
              }}
            >
              Video
            </Text>
          </TouchableOpacity>
        )}
      </Animatable.View>
    ));
    return (
      <View>
        <GenericText
          style={{fontSize: 21, fontFamily: "lato-regular", paddingBottom: 10}}
        >
          {title}
        </GenericText>
        <View>{routines}</View>
      </View>
    );
  };

  render() {
    const validRoutines = this.props.routines.filter(
      (routine) => routine.ejercicios.length
    );
    validRoutines.sort((a, b) => {
      const nameA = a.description.toUpperCase(); // ignore upper and lowercase
      const nameB = b.description.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    const personalRoutines = validRoutines.filter(
      (routine) => !routine.generica
    );
    const generalRoutines = validRoutines.filter((routine) => routine.generica);
    return (
      <GScrollView>
        <RootWrapper style={{padding: 0}}>
          {this.props.routines.length > 0 ? (
            <>
              <View style={{alignItems: "flex-start"}}>{this.showTitle()}</View>
              <View style={styles.routinesWrapper}>
                <View>{this.showRoutines(personalRoutines, "PERSONALES")}</View>
                <View style={{marginTop: 60}}>
                  {this.showRoutines(generalRoutines, "GENERALES")}
                </View>
              </View>
            </>
          ) : (
            <View style={{alignItems: "center", marginTop: 50}}>
              <GenericText
                style={{fontFamily: "brother-1816-bold", fontSize: 22}}
              >
                ¡Ups!
              </GenericText>
              <GenericText style={{fontSize: 18}}>
                Todavía no tienes rutinas
              </GenericText>
              <GenericText style={{fontSize: 18}}>disponibles</GenericText>
            </View>
          )}
        </RootWrapper>
      </GScrollView>
    );
  }
}
