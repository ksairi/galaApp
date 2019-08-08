import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import icomoonConfig from '/assets/icons/icomoonConfig.json'
import * as FileSystem from 'expo-file-system'
export default createIconSetFromIcoMoon(icomoonConfig)

export const getProfilePicturePath = () => {
  return `${FileSystem.documentDirectory}${Date.now()}-profilePic.jpg`
}
