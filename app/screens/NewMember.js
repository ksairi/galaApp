import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import GenericText from "/components/presentationals/GenericText";
import RootWrapper from "/components/presentationals/RootWrapper";

@connect(state => ({
	newMemberData: state.newMemberData
}))
export default class NewMember extends React.Component {
	render() {
		return (
			<RootWrapper
				style={{
					justifyContent: "center"
				}}>
				{this.props.newMemberData.freeEntryData && (
					<View>
						<GenericText
							style={[
								{
									fontFamily: "lato-regular",
									flex: -1,
									paddingBottom: 10,
									fontSize: 20
								}
							]}>
							Presentá éste código en recepción y disfrutá un mes gratis!
						</GenericText>
						<GenericText
							style={[
								{
									fontFamily: "brother-1816-bold",
									flex: -1,
									paddingBottom: 20,
									fontSize: 25
								}
							]}>
							{this.props.newMemberData.freeEntryData.code}
						</GenericText>
					</View>
				)}

				<GenericText
					style={{ fontFamily: "lato-regular", fontSize: 18, flex: -1 }}>
					Te quedan
					<GenericText
						style={{
							fontFamily: "brother-1816-bold",
							fontSize: 18,
							color: "green"
						}}>
						{" "}
						{30 -
							Math.floor(
								(Date.now() - this.props.newMemberData.freeEntryData.date) /
									(1000 * 3600 * 24)
							)}{" "}
					</GenericText>
					dias para activarlo!
				</GenericText>
			</RootWrapper>
		);
	}
}
