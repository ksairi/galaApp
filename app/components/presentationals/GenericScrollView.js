import React from "react";
import { ScrollView } from "react-native";

export default props => (
	<ScrollView
		contentContainerStyle={[
			{
				flexGrow: 1
			},
			props.contentContainerStyle
		]}
		style={{ backgroundColor: "#12194d" }}>
		{props.children}
	</ScrollView>
);
