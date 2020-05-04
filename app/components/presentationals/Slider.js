import React from "react";
import RNImageSlider from "react-native-image-slider-fork";

export default class Slider extends React.PureComponent {
  render() {
    const {Component, ...rest} = this.props;
    return (
      <RNImageSlider
        {...rest}
        autoPlayWithInterval={7000}
        images={this.props.items}
        imagesWidth={this.props.itemWidth}
        style={[
          {
            width: this.props.itemWidth,
          },
          this.props.style,
        ]} // default to portrait
        customSlide={({index, item, style}) => {
          return <Component {...{style}} key={index} data={item} />;
        }}
      />
    );
  }
}
