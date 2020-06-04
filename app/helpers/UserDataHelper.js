import {
  uploadProfilePicture as uploadProfilePictureApi,
  synchMemberProperties as synchMemberPropertiesApi,
} from "helpers/ApiHelper";
import ActionsCreators from "redux/actions";
import {Urls} from "config/settings";
import {getProfilePicturePath} from "helpers/ImageHelper";
import * as FileSystem from "expo-file-system";

export const getFreeEntryDaysLeft = (date) =>
  30 - Math.floor((Date.now() - date) / (1000 * 3600 * 24));

export const uploadProfilePicture = (dispatch, profilePicture) => {
  const data = new FormData();
  data.append("name", profilePicture.userId);
  data.append("picture", {
    uri: profilePicture.path,
    type: "image/jpeg", // or photo.type
    name: profilePicture.userId,
  });

  uploadProfilePictureApi(data)
    .then(() => {
      dispatch(ActionsCreators.setProfilePictureSynched());
    })
    .catch(() => {});
};

export const getRemoteProfilePicture = (userId) => {
  const fileUri = getProfilePicturePath();
  return FileSystem.downloadAsync(Urls.PROFILE_PICTURES + userId, fileUri)
    .then(({uri, status}) => (status === 200 ? uri : null))
    .catch(() => null);
};

export const synchMemberProperties = (dispatch, {userId, data}) => {
  let paramsData = {};
  Object.entries(data).forEach((dataItem) => {
    if (!dataItem[1].synched) {
      paramsData = {
        ...paramsData,
        [dataItem[0]]: {value: dataItem[1].value},
      };
    }
  });

  if (Object.entries(paramsData).length > 0) {
    const params = {userId, data: paramsData};
    synchMemberPropertiesApi(params)
      .then(() => {
        if (paramsData.receiveNotifications) {
          dispatch(ActionsCreators.setReceiveNotificationsSynched());
        }
      })
      .catch(() => {});
  }
};
