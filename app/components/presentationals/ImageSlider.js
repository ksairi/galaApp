import React from "react";
import { Image } from "react-native";
import RNImageSlider from "react-native-image-slider";

export default class ImageSlider extends React.PureComponent {
	render() {
		return (
			<RNImageSlider
				autoPlayWithInterval={7000}
				images={this.props.base64Images}
				style={{
					width: this.props.imageWidth
				}} //default to portrait
				customSlide={({ index, item, style, width }) => {
					return (
						<Image
							key={index}
							source={{
								uri:
									"data:image/" +
									this.props.images["type"] +
									";base64," +
									this.props.base64Images[index]
							}}
							style={{
								height: this.props.imageHeight,
								width: this.props.imageWidth
							}}
						/>
					);
				}}
			/>
		);
	}
}
