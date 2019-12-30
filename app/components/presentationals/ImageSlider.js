import React from 'react'
import RNImageSlider from 'react-native-image-slider-fork'

export default class ImageSlider extends React.PureComponent {
  render () {
    const {Component} = this.props
    return (
      <RNImageSlider
        autoPlayWithInterval={7000}
        images={this.props.images}
        imagesWidth={this.props.imageWidth}
        style={[
          {
            width: this.props.imageWidth
          },
          this.props.style
        ]} // default to portrait
        customSlide={({ index, item, style, width }) => {
          return (
            <Component image={item} data={this.props.arrayData[index]} />
          )
        }}
      />
    )
  }
}
