import React from "react";
import {View} from "react-native";
import GScrollView from "components/presentationals/GenericScrollView";
import {connect} from "react-redux";
import Swiper from "react-native-web-swiper";
import RootWrapper from "components/presentationals/RootWrapper";
import GenericText from "components/presentationals/GenericText";
import * as Animatable from "react-native-animatable-promise";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import {Screens} from "config/settings";

const styles = {
  timetableDay: {
    backgroundColor: "#12194d",
    flex: -1,
  },
  day: {
    fontFamily: "brother-1816-bold",
    fontSize: 25,
    marginTop: 10,
    marginBottom: 5,
  },
  dayMessage: {
    fontSize: 17,
    fontFamily: "lato-bold",
    flex: 2,
    marginTop: 5,
    marginBottom: 20,
  },
  className: {
    fontFamily: "brother-1816-bold",
    fontSize: 18,
    textAlign: "left",
    flexWrap: "wrap",
  },
  classTime: {
    fontFamily: "brother-1816-bold",
    fontSize: 18,
    textAlign: "right",
    flex: -1,
    paddingLeft: 35,
  },
};

const timetableDaysMetadata = [
  {
    day: "LUNES",
  },
  {
    day: "MARTES",
  },
  {
    day: "MIÉRCOLES",
  },
  {
    day: "JUEVES",
  },
  {
    day: "VIERNES",
  },
  {
    day: "SÁBADO",
  },
  {
    day: "DOMINGO",
  },
];

const AnimatedCarousel = Animatable.createAnimatableComponent(Swiper);

@connect((state) => ({
  timetable: state.timetable,
  orientation: state.currentOrientation,
}))
export default class TimeTable extends React.Component {
  static currentIndex = null;

  componentDidMount() {
    AnalyticsHelper.setPageHit(Screens.Timetable);
  }

  getCurrentIndex = () => {
    if (TimeTable.currentIndex != null) {
      return TimeTable.currentIndex;
    }
    // inital index
    const today = new Date().getDay();
    if (today === 0) {
      return today; // monday in our schema
    }
    return today - 1;
  };

  getTimeTable = () => {
    const showSunday = this.props.timetable[6].data.find((row) => row);
    if (!showSunday) {
      timetableDaysMetadata.length--;
    }
    return timetableDaysMetadata.map((dayMetadata, index) => (
      <GScrollView key={index}>
        <View style={styles.timetableDay}>
          <View
            style={{
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            <GenericText style={styles.day}>{dayMetadata.day}</GenericText>

            <View>
              <GenericText style={styles.dayMessage}>
                {this.props.timetable[index].message}
              </GenericText>
              {this.props.timetable[index].data.map((timetableData, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    paddingBottom: 10,
                  }}
                >
                  <GenericText style={styles.className}>
                    {timetableData.saloon} {" - "} {timetableData.class}
                  </GenericText>
                  <GenericText style={styles.classTime}>
                    {timetableData.time}
                  </GenericText>
                </View>
              ))}
            </View>
          </View>
        </View>
      </GScrollView>
    ));
  };

  render() {
    return (
      <RootWrapper
        style={{
          padding: 0,
        }}
      >
        <AnimatedCarousel
          useNativeDriver
          animation="zoomIn"
          from={this.getCurrentIndex()}
          controlsProps={{
            prevPos: "top-left",
            nextPos: "top-right",
            prevTitle: "<",
            nextTitle: ">",
            nextTitleStyle: {color: "white", fontSize: 24, fontWeight: "500"},
            prevTitleStyle: {color: "white", fontSize: 24, fontWeight: "500"},
            DotComponent: () => null,
          }}
        >
          {this.getTimeTable()}
        </AnimatedCarousel>
      </RootWrapper>
    );
  }
}
