import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icomoonConfig from "/assets/icons/icomoonConfig.json";
import { FileSystem } from "expo";
export default createIconSetFromIcoMoon(icomoonConfig);

export const getProfilePicturePath = () => {
	return `${FileSystem.documentDirectory}${Date.now()}-profilePic.jpg`;
};
