import React from "react";
import { Image } from "react-native";
import RNImageSlider from "react-native-image-slider";

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
						<Image
							key={index}
							source={
								this.props.images[index].base64String
									? {
											uri:
												"data:image/" +
												this.props.images[index].fileExtension +
												";base64," +
												this.props.images[index].base64String
									  }
									: this.props.images[index]
							}
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
