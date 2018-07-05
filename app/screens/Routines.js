import React from "react";
import { ScrollView, Image, View } from "react-native";
import { RkButton } from "react-native-ui-kitten";
import { connect } from "react-redux";
import RootWrapper from "/components/presentationals/RootWrapper";
import Footer from "/components/presentationals/Footer";
import GenericText from "/components/presentationals/GenericText";
import * as ScreenDimensions from "/utils/ScreenDimensions";
import { Screens } from "/config/settings";
import { ActionsCreators } from "/redux/actions/";

const styles = {
	routinesWrapper: {
		flex: 1,
		marginBottom: 40
	}
};

@connect(state => ({
	routines: state.routines,
	routinesImages: state.routinesImages
}))
export default class Routines extends React.Component {
	seeRoutine = routine => () => {
		this.props.dispatch(ActionsCreators.setCurrentRoutine(routine));
		this.props.navigation.navigate(Screens.RoutineDetail);
	};

	showRoutines = () =>
		this.props.routines.map((routine, index) => (
			<View
				key={index}
				style={{
					flexDirection: "row",
					flex: 1,
					marginLeft: 20,
					marginRight: 20,
					marginTop: 15
				}}>
				<RkButton
					shapeType="outline"
					style={{
						backgroundColor: "#12194d",
						flex: 1,
						paddingLeft: 10,
						justifyContent: "flex-start",
						height: 60
					}}
					contentStyle={{
						fontSize: 22,
						fontFamily: "brother-1816-bold"
					}}
					onPress={this.seeRoutine(routine)}>
					{routine.description.toUpperCase()}
				</RkButton>
			</View>
		));

	render() {
		return (
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1
				}}>
				<RootWrapper style={{ padding: 0 }}>
					<Image
						source={
							this.props.routinesImages.length > 0 &&
							this.props.routinesImages[0].imageIndex == 0
								? require("../images/routines.jpg")
								: {
										uri:
											"data:image/" +
											this.props.routinesImages[0].fileExtension +
											";base64," +
											this.props.routinesImages[0].image
								  }
						}
						style={{
							height: 205,
							width: ScreenDimensions.getPortraitWidth(),
							alignSelf: "center"
						}}
					/>
					<View style={styles.routinesWrapper}>
						{this.props.routines.length > 0 ? (
							this.showRoutines()
						) : (
							<View style={{ alignItems: "center", marginTop: 20 }}>
								<GenericText
									style={{ fontFamily: "brother-1816-bold", fontSize: 22 }}>
									¡Ups!
								</GenericText>
								<GenericText style={{ fontSize: 18 }}>
									Todavía no tienes rutinas
								</GenericText>
								<GenericText style={{ fontSize: 18 }}>disponibles</GenericText>
							</View>
						)}
					</View>
					<Footer />
				</RootWrapper>
			</ScrollView>
		);
	}
}
