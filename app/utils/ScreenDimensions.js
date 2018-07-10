import { Dimensions } from "react-native";
export const getPortraitWidth = () => {
	const height = Dimensions.get("window").height;
	const width = Dimensions.get("window").width;
	return width > height ? height : width;
};
