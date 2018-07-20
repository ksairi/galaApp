import React from "react";
import RNImageSlider from "react-native-image-slider";
import AutoHeightImage from "react-native-auto-height-image";

export default class ImageSlider extends React.PureComponent {
	render() {
		return (
			<RNImageSlider
				autoPlayWithInterval={7000}
				images={this.props.images}
				style={{
					width: this.props.imageWidth
				}} //default to portrait
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
