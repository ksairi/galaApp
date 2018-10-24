import React from "react";
import { View, Linking } from "react-native";
import { RkButton } from "react-native-ui-kitten";
import Icon from "/helpers/ImageHelper";
import GenericText from "/components/presentationals/GenericText";
import { FontAwesome } from "@expo/vector-icons";

const styles = {
	button: {
		backgroundColor: "#12194d",
		width: 70,
		height: 60,
		marginRight: 20
	},
	text: {
		fontSize: 14,
		fontFamily: "lato-bold",
		flex: -1
	}
};

export default class Footer extends React.PureComponent {
	openUrl = url => () => {
		Linking.openURL(url);
	};
	render() {
		const iconFontSize = 30;
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<View style={{ flexDirection: "row", flex: -1, paddingBottom: 20 }}>
					<RkButton
						rkType="rounded"
						style={styles.button}
						onPress={this.openUrl("https://www.instagram.com/gala.gym/")}>
						<Icon name="instagram" size={iconFontSize} color="white" />
					</RkButton>
					<RkButton
						rkType="rounded"
						style={styles.button}
						onPress={this.openUrl(
							"https://www.youtube.com/channel/UCFxjOj3tJ3Zfe9nEKNzCyDw"
						)}>
						<FontAwesome name="youtube" size={37} color="white" />
					</RkButton>
					<RkButton
						rkType="rounded"
						style={styles.button}
						onPress={this.openUrl(
							"https://www.facebook.com/pg/GalaGymBA/posts/"
						)}>
						<Icon name="facebook" size={iconFontSize} color="white" />
					</RkButton>
				</View>
				<View
					style={{ flex: -1, alignItems: "center", justifyContent: "center" }}>
					<GenericText style={styles.text}>WWW.GALAGYM.COM</GenericText>
					<GenericText style={styles.text}>
						ALL RIGHTS RESERVED GALA 2018
					</GenericText>
				</View>
			</View>
		);
	}
}
