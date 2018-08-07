import * as NotificationsActions from "./notifications";
import * as RoutinesActions from "./routines";
import * as TimetableActions from "./timetable";
import * as UserDataActions from "./userData";
import * as SessionActions from "./session";
import * as NavigationActions from "./navigation";
import * as DeviceActions from "./device";
import * as SynchedDataActions from "./synchedData";
import * as MessagesActions from "./messages";

export const ActionsCreators = Object.assign(
	{},
	NotificationsActions,
	RoutinesActions,
	TimetableActions,
	UserDataActions,
	SessionActions,
	NavigationActions,
	DeviceActions,
	SynchedDataActions,
	MessagesActions
);
