import React from "react";
import {View, Dimensions, Platform} from "react-native";
import GScrollView from "components/presentationals/GenericScrollView";
import {connect} from "react-redux";
import Carousel from "react-native-carousel-control-fork";
import RootWrapper from "components/presentationals/RootWrapper";
import GenericText from "components/presentationals/GenericText";
import * as Animatable from "react-native-animatable-promise";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import {Screens} from "config/settings";

const styles = {
  timetableDay: {
    flex: 1,
    backgroundColor: "#12194d",
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

const carouselOffset = 10;

const AnimatedCarousel = Animatable.createAnimatableComponent(Carousel);

@connect((state) => ({
  timetable: state.timetable,
  orientation: state.currentOrientation,
}))
export default class TimeTbale extends React.Component {
  state = {
    portraitWidth: Dimensions.get("window").width,
  };

  static currentIndex = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.orientation) {
      if (nextProps.orientation === "landscape") {
        return {
          portraitWidth: Dimensions.get("window").height,
          sneak: 50,
        };
      }
      return {
        portraitWidth: Dimensions.get("window").width,
        sneak: 6,
      };
    }
    return prevState;
  }

  componentDidMount() {
    AnalyticsHelper.setPageHit(Screens.Timetable);
  }

  componentWillUnmount() {
    Carousel.currentIndex = null;
  }

  getCurrentIndex = () => {
    if (Carousel.currentIndex != null) {
      return Carousel.currentIndex;
    }
    // inital index
    const today = new Date().getDay();
    if (today === 0) {
      return today; // monday in our schema
    }
    return today - 1;
  };

  onPageChange = (position) => {
    Carousel.currentIndex = position;
  };

  getTimeTable = () => {
    const showSunday = this.props.timetable[6].data.find((row) => row);
    if (!showSunday) {
      timetableDaysMetadata.length--;
    }
    return timetableDaysMetadata.map((dayMetadata, index) => (
      <View key={index} style={styles.timetableDay}>
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
                  {timetableData.class}
                </GenericText>
                <GenericText style={styles.classTime}>
                  {timetableData.time}
                </GenericText>
              </View>
            ))}
          </View>
        </View>
      </View>
    ));
  };

  render() {
    return (
      <GScrollView>
        <RootWrapper
          style={{
            padding: 0,
          }}
        >
          <AnimatedCarousel
            useNativeDriver
            animation="zoomIn"
            style={{backgroundColor: "black", paddingLeft: 5}}
            pageStyle={{
              paddingLeft: 0,
              paddingRight: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 20,
            }}
            pageWidth={this.state.portraitWidth - carouselOffset}
            sneak={this.state.sneak}
            currentPage={this.getCurrentIndex()}
            swipeThreshold={0.1}
            onPageChange={this.onPageChange}
            horizontal={Platform.OS !== "web"}
          >
            {this.getTimeTable()}
          </AnimatedCarousel>
        </RootWrapper>
      </GScrollView>
    );
  }
}
