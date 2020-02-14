import React from 'react'
import RNImageSlider from 'react-native-image-slider-fork'

export default class Slider extends React.PureComponent {
  render () {
    console.log(this.props)
    const {Component} = this.props
    return (
      <RNImageSlider
        autoPlayWithInterval={7000}
        images={this.props.items}
        imagesWidth={this.props.itemWidth}
        style={[
          {
            width: this.props.itemWidth
          },
          this.props.style
        ]} // default to portrait
        customSlide={({ index, item }) => {
          return (
            <Component key={index} data={item} />
          )
        }}
      />
    )
  }
}
