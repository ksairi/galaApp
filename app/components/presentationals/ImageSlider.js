import React from "react";
import RNImageSlider from "react-native-image-slider-fork";
import AutoHeightImage from "react-native-auto-height-image";

export default class ImageSlider extends React.PureComponent {
	render() {
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
				]} //default to portrait
				customSlide={({ index, item, style, width }) => {
					return (
						<AutoHeightImage
							key={index}
							source={
								item.uri
									? {
											uri: item.uri
									  }
									: item
							}
							width={this.props.imageWidth}
						/>
					);
				}}
			/>
		);
	}
}
