import { combineReducers } from "redux";
import createSecureStore from "redux-persist-expo-securestore";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import * as notificationsReducer from "./notifications";
import * as routinesReducer from "./routines";
import * as timetableReducer from "./timetable";
import * as userDataReducer from "./userData";
import * as sessionReducer from "./session";
import * as navigationReducer from "./navigation";
import * as deviceReducer from "./device";
import * as synchedImagesReducer from "./synchedImages";

const rootPresistConfig = {
	key: "root",
	storage: createSecureStore(),
	stateReconciler: autoMergeLevel2,
	blacklist: ["currentOrientation"]
};

const rootReducer = combineReducers(
	Object.assign(
		notificationsReducer,
		routinesReducer,
		timetableReducer,
		userDataReducer,
		sessionReducer,
		navigationReducer,
		deviceReducer,
		synchedImagesReducer
	)
);

export default persistReducer(rootPresistConfig, rootReducer);
