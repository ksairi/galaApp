import { ActionsTypes, Paths } from "/config/settings";
import { fetchUserData } from "/helpers/ApiHelper";

export function setUserData(userData) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_USER_DATA, userData });
	};
}

export function setNewMemberData(newMemberData) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_NEW_MEMBER_DATA, newMemberData });
	};
}

export function fetchUserStore() {
	return (dispatch, getState) => {
		if (getState().userData.userId) {
			fetchUserData(getState().userData.userId).then(
				response => {
					//const { notifications, routines, timetable } = response.data;
					const { routines } = response.data;
					//dispatch({ type: ActionsTypes.SET_NOTIFICATIONS, notifications });
					dispatch({ type: ActionsTypes.SET_ROUTINES, routines });
					//dispatch({ type: ActionsTypes.SET_TIMETABLE, timetable });
				},
				error => {
					console.log(error);
					//TODO SHOW AN ERROR SOMEWHERE IN THE SCREEN
				}
			);
		}
	};
}

export function setUserNewPassword(password) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_NEW_PASSWORD, password });
	};
}

export function setProfilePicture(profilePicture) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_PROFILE_PICTURE, profilePicture });
	};
}

export function setProfilePictureSynched() {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_PROFILE_PICTURE_SYNCHED });
	};
}

export function setReceiveNotifications(obj) {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_RECEIVE_NOTIFICATIONS, obj });
	};
}

export function setReceiveNotificationsSynched() {
	return (dispatch, getState) => {
		dispatch({ type: ActionsTypes.SET_RECEIVE_NOTIFICATIONS_SYNCHED });
	};
}
