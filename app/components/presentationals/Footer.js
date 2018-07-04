import React from "react";
import { View, Linking } from "react-native";
import { RkTheme, RkButton } from "react-native-ui-kitten";
import Icon from "/helpers/ImageHelper";
import GenericText from "/components/presentationals/GenericText";

const styles = {
	button: {
		backgroundColor: "#12194d",
		width: 70,
		marginRight: 20
	},
	text: {
		fontSize: 14,
		fontFamily: "lato-bold",
		flex: 0
	}
};

export default class Footer extends React.PureComponent {
	openUrl = url => () => {
		Linking.openURL(url);
	};
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<View style={{ flexDirection: "row", flex: 0, paddingBottom: 20 }}>
					<RkButton
						rkType="rounded"
						style={styles.button}
						onPress={this.openUrl("https://twitter.com/galagym?lang=en")}>
						<Icon name="instagram" size={40} color="white" />
					</RkButton>
					<RkButton
						rkType="rounded"
						style={styles.button}
						onPress={this.openUrl(
							"https://www.facebook.com/pg/GalaGymBA/posts/"
						)}>
						<Icon name="g+" size={40} color="white" />
					</RkButton>
					<RkButton
						rkType="rounded"
						style={styles.button}
						onPress={this.openUrl(
							"https://www.facebook.com/pg/GalaGymBA/posts/"
						)}>
						<Icon name="facebook" size={40} color="white" />
					</RkButton>
				</View>
				<View
					style={{ flex: 0, alignItems: "center", justifyContent: "center" }}>
					<GenericText style={styles.text}>WWW.GALAGYM.COM</GenericText>
					<GenericText style={styles.text}>
						ALL RIGHTS RESERVED GALAGYM 2018
					</GenericText>
				</View>
			</View>
		);
	}
}
