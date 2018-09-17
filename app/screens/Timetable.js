import React from "react";
import { View, Dimensions } from "react-native";
import GScrollView from "/components/presentationals/GenericScrollView";
import { connect } from "react-redux";
import Carousel from "react-native-carousel-control-fork";
import AutoHeightImage from "react-native-auto-height-image";
import RootWrapper from "/components/presentationals/RootWrapper";
import Footer from "/components/presentationals/Footer";
import GenericText from "/components/presentationals/GenericText";
import * as ScreenDimensions from "/utils/ScreenDimensions";

const styles = {
	timetableDay: {
		flex: 1,
		backgroundColor: "#12194d"
	},
	day: {
		fontFamily: "brother-1816-bold",
		fontSize: 25,
		marginTop: 10,
		marginBottom: 5
	},
	dayMessage: {
		fontSize: 17,
		fontFamily: "lato-bold",
		flex: 2,
		marginTop: 5,
		marginBottom: 20
	},
	className: {
		fontFamily: "brother-1816-bold",
		fontSize: 18,
		textAlign: "left",
		flexWrap: "wrap"
	},
	classTime: {
		fontFamily: "brother-1816-bold",
		fontSize: 18,
		textAlign: "right",
		flex: -1,
		paddingLeft: 35
	}
};

const timetableDaysMetadata = [
	{
		day: "LUNES",
		image: require("../images/timetable_mon.jpg")
	},
	{
		day: "MARTES",
		image: require("../images/timetable_tue.jpg")
	},
	{
		day: "MIÉRCOLES",
		image: require("../images/timetable_wed.jpg")
	},
	{
		day: "JUEVES",
		image: require("../images/timetable_thu.jpg")
	},
	{
		day: "VIERNES",
		image: require("../images/timetable_fri.jpg")
	},
	{
		day: "SÁBADO",
		image: require("../images/timetable_sat.jpg")
	}
];

const carouselOffset = 50;

@connect(state => ({
	timetable: state.timetable,
	orientation: state.currentOrientation
}))
export default class TimeTbale extends React.Component {
	state = {
		portraitWidth: Dimensions.get("window").width
	};
	static currentIndex = null;

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.orientation) {
			if (nextProps.orientation == "landscape") {
				return {
					portraitWidth: Dimensions.get("window").height,
					sneak: 50
				};
			} else {
				return {
					portraitWidth: Dimensions.get("window").width,
					sneak: 6
				};
			}
		}

		return prevState;
	}

	componentWillUnmount() {
		Carousel.currentIndex = null;
	}

	getCurrentIndex = () => {
		if (Carousel.currentIndex != null) {
			return Carousel.currentIndex;
		}
		//inital index
		const today = new Date().getDay();
		if (today == 0) {
			return today; //monday in our schema
		}
		return today - 1;
	};

	onPageChange = position => {
		Carousel.currentIndex = position;
	};

	render() {
		return (
			<GScrollView>
				<RootWrapper
					style={{
						padding: 0
					}}>
					<Carousel
						pageStyle={{
							paddingLeft: 0,
							paddingRight: 0,
							marginLeft: 0,
							marginRight: 0
						}}
						pageWidth={this.state.portraitWidth - carouselOffset}
						sneak={this.state.sneak}
						currentPage={this.getCurrentIndex()}
						pageStyle={{
							marginBottom: 20
						}}
						swipeThreshold={0.1}
						onPageChange={this.onPageChange}>
						{timetableDaysMetadata.map((dayMetadata, index) => (
							<View key={index} style={styles.timetableDay}>
								<View
									style={{
										borderTopLeftRadius: 15,
										borderTopRightRadius: 15,
										overflow: "hidden",
										alignSelf: "center"
									}}>
									<AutoHeightImage
										source={dayMetadata.image}
										width={ScreenDimensions.getPortraitWidth() - carouselOffset}
									/>
								</View>
								<View
									style={{
										paddingLeft: 15,
										paddingRight: 15
									}}>
									<GenericText style={styles.day}>
										{dayMetadata.day}
									</GenericText>

									<View>
										<GenericText style={styles.dayMessage}>
											{this.props.timetable[index].message}
										</GenericText>
										{this.props.timetable[index].data.map(
											(timetableData, index) => (
												<View
													key={index}
													style={{
														flex: 1,
														flexDirection: "row",
														paddingBottom: 10
													}}>
													<GenericText style={styles.className}>
														{timetableData.class}
													</GenericText>
													<GenericText style={styles.classTime}>
														{timetableData.time}
													</GenericText>
												</View>
											)
										)}
									</View>
								</View>
							</View>
						))}
					</Carousel>
					<Footer />
				</RootWrapper>
			</GScrollView>
		);
	}
}
