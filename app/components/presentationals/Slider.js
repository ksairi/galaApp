import React from "react";
import {View} from "react-native";
import Swiper from "react-native-web-swiper";

export default class Slider extends React.PureComponent {
  render() {
    const {Component} = this.props;
    return (
      <View style={{flex: 1}}>
        <Swiper
          loop
          timeout={5}
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
          {this.props.items.map((item, index) => (
            <View
              key={index}
              style={{flex: 1, alignItems: "center", justifyContent: "center"}}
            >
              <Component data={item} />
            </View>
          ))}
        </Swiper>
      </View>
    );
  }
}
