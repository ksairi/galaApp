const SERVER_HOSTNAME_1 = __DEV__
	? "http://192.168.0.104:3000/"
	: "https://aqueous-harbor-62651.herokuapp.com/";

const SERVER_HOSTNAME_2 = __DEV__
	? "http://192.168.0.104:81/api/"
	: "http://galagym.com/api/";

exports.Urls = {
	LOGIN: SERVER_HOSTNAME_1 + "login",
	REGISTER: SERVER_HOSTNAME_1 + "register",
	RESET_PASSWORD: SERVER_HOSTNAME_1 + "resetPassword",
	SEND_REFERRAL: SERVER_HOSTNAME_2 + "sendReferral.php",
	SEND_CLIENT_TOKEN: SERVER_HOSTNAME_1 + "sendClientToken",
	SYN_LOCAL_STORAGE: SERVER_HOSTNAME_1 + "syncLocalStorage",
	FETCH_USER_DATA: SERVER_HOSTNAME_1 + "fetchUserData",
	FETCH_DYNAMIC_DATA: SERVER_HOSTNAME_2 + "fetchDynamicData.php",
	SET_CONTENT_SAVED: SERVER_HOSTNAME_2 + "setContentSaved.php",
	SET_NOTIFIED_PROMOTIONS_SAVED:
		SERVER_HOSTNAME_2 + "setNotifiedPromotionsSaved.php",
	SEND_MESSAGES: SERVER_HOSTNAME_2 + "sendMessages.php",
	SET_NOTIFIED_MESSAGES_SAVED:
		SERVER_HOSTNAME_2 + "setNotifiedMessagesSaved.php",
	GET_REAL_TIME_MESSAGES: SERVER_HOSTNAME_2 + "getRealTimeMessages.php",
	SET_REAL_TIME_MESSAGES_SAVED:
		SERVER_HOSTNAME_2 + "setRealTimeMessagesSaved.php",
	UPLOAD_PROFILE_PICTURE: SERVER_HOSTNAME_2 + "uploadProfilePicture.php",
	PROFILE_PICTURES: SERVER_HOSTNAME_2 + "profile_pictures/",
	SYNCH_MEMBER_PROPERTIES: SERVER_HOSTNAME_2 + "synchMemberProperties.php"
};

exports.Messages = {
	INVALID_USER_ID_PASSWORD: "Ingresá tu DNI y contraseña para continuar",
	INVALID_CONFIRM_PASSWORD: "Las contraseñas no coinciden",
	SERVER_ERROR:
		"Error de conexión a nuestros servidores. Por favor reintentá en unos minutos",
	CHECK_INTERNET_CONNECTION: "Verificá tu conexión de internet",
	LOADING: "Cargando...",
	FORGOT_PASSWORD: "¿Olvidaste la contraseña?",
	USER_ALREADY: "¿Ya tenes una cuenta?",
	INVALID_PASSWORD_LENGTH: "La contraseña debe tener al menos 5 caracteres",
	INVALID_USER_ID_LENGTH: "DNI inválido",
	INVALID_MAIL: "E-mail inválido",
	SUCCESSFULY_RESET_PASSWORD:
		"Contraseña actualizada. Volvé a loguearte desde aca",
	SYSTEM_ERROR:
		"Error al guardar información en el dispositivo. Vuelva a intentarlo nuevamente",
	SYSTEM_READ_ERROR:
		"Error al leer información del dispositivo. Vuelva a intentarlo nuevamente",
	INVALID_MAIL: "Por favor ingresá una dirección válida",
	INCOMPLETE_INPUT_DATA: "Completá todos los campos antes de continuar",
	NO_SPACE_IN_DISK:
		"Espacio insuficiente. Por favor, elimine contenido para continuar."
};

exports.Labels = {
	SUBMIT: "Enviar",
	MAIL: "E-mail"
};

export const Screens = {
	CheckUserActivity: "CheckUserActivity",
	Welcome: "Welcome",
	SignIn: "SignIn",
	ResetPassword: "ResetPassword",
	SignUp: "SignUp",
	Home: "Home",
	Profile: "Profile",
	Routines: "Routines",
	RoutineDetail: "RoutineDetail",
	Classes: "Classes",
	Timetable: "Timetable",
	Messages: "Messages",
	Referrals: "Referrals",
	LoginStack: "loginStack",
	HomeStack: "homeStack",
	Settings: "Settings",
	CameraView: "CameraView",
	NewMember: "NewMember"
};

exports.SignUpConstraints = {
	PASSWORD_MIN_LENGTH: 5,
	USER_ID_MIN_LENGTH: 7
};

exports.ServerProtocol = {
	statusField: "status",
	OK: "ok",
	messageField: "message"
};

exports.ActionsTypes = {
	// Notifications
	SET_IS_DOWNLOADING_REMOTE_IMAGES: "SET_IS_DOWNLOADING_REMOTE_IMAGES",
	SET_NOTIFICATIONS_TEXT: "SET_NOTIFICATIONS_TEXT",
	// Messages
	SET_MESSAGES: "SET_MESSAGES",
	SET_SENT_MESSAGES: "SET_SENT_MESSAGES",
	SET_HAS_SHOWN_UNSENT_MESSAGES_DIALOG: "SET_HAS_SHOWN_UNSENT_MESSAGES_DIALOG",
	DELETE_MESSAGE: "DELETE_MESSAGE",
	SET_NEW_MESSAGES_COUNT: "SET_NEW_MESSAGES_COUNT",
	// Routines
	SET_ROUTINES: "SET_ROUTINES",
	SET_CURRENT_ROUTINE: "SET_CURRENT_ROUTINE",
	// Timetable
	SET_TIMETABLE: "SET_TIMETABLE",
	// User Data
	SET_USER_DATA: "SET_USER_DATA",
	SET_NEW_MEMBER_DATA: "SET_NEW_MEMBER_DATA",
	SET_NEW_PASSWORD: "SET_NEW_PASSWORD",
	SET_PROFILE_PICTURE: "SET_PROFILE_PICTURE",
	SET_RECEIVE_NOTIFICATIONS: "SET_RECEIVE_NOTIFICATIONS",
	UPLOAD_PROFILE_PICTURE: "UPLOAD_PROFILE_PICTURE",
	SET_PROFILE_PICTURE_SYNCHED: "SET_PROFILE_PICTURE_SYNCHED",
	SET_RECEIVE_NOTIFICATIONS_SYNCHED: "SET_RECEIVE_NOTIFICATIONS_SYNCHED",
	//Session
	LOG_IN: "LOG_IN",
	LOG_OUT: "LOG_OUT",
	SET_IS_APPS_FIRST_TIME: "SET_IS_APPS_FIRST_TIME",
	SET_AUTO_LOGIN_ERROR_MESSAGE: "SET_AUTO_LOGIN_ERROR_MESSAGE",
	SET_HAS_RESET_FIRST_PASSWORD: "SET_HAS_RESET_FIRST_PASSWORD",
	SET_IN_RESET_FIRT_PASSWORD_MODE: "SET_IN_RESET_FIRT_PASSWORD_MODE",
	SET_IS_SAVING_NOTIFICATIONS_DATA: "SET_IS_SAVING_NOTIFICATIONS_DATA",

	//Navigation
	SET_CURRENT_HOME_DRAWER_OPTION: "SET_CURRENT_HOME_DRAWER_OPTION",
	//Device
	SET_CURRENT_ORIENTATION: "SET_CURRENT_ORIENTATION",
	SET_DEVICE_ID: "SET_DEVICE_ID",
	//Synched Data
	SET_LOGIN_IMAGES: "SET_LOGIN_IMAGES",
	SET_MAIN_MENU_IMAGES: "SET_MAIN_MENU_IMAGES",
	REMOVE_MAIN_MENU_IMAGES: "REMOVE_MAIN_MENU_IMAGES",
	SET_PROMOTIONS: "SET_PROMOTIONS",
	REMOVE_PROMOTION_ITEM: "REMOVE_PROMOTION_ITEM",
	SET_SYNCHED_DATA_PARAMETERS: "SET_SYNCHED_DATA_PARAMETERS",
	SET_ROUTINES_IMAGES: "SET_ROUTINES_IMAGES",
	SET_CLASSES_IMAGES: "SET_CLASSES_IMAGES",
	SET_TIMETABLE_IMAGES: "SET_TIMETABLE_IMAGES",
	SET_LOGIN_SYNCHED_DATA_PARAMETERS: "SET_LOGIN_SYNCHED_DATA_PARAMETERS"
};

export const SectionsData = [
	{
		icon: "exclamation",
		label: "SOCIO NUEVO",
		screen: Screens.NewMember,
		otherIcon: true,
		drawerStyle: {
			icon: { marginTop: 5, paddingLeft: 15, fontSize: 30 },
			label: { marginTop: 10, color: "green", fontFamily: "lato-regular" },
			arrow: { marginTop: 15 }
		},
		homeStyle: { fontSize: 40, color: "white" }
	},
	{
		icon: "user-icon",
		label: "MI PERFIL",
		screen: Screens.Profile,
		drawerStyle: {
			icon: { marginTop: 5, paddingLeft: 7, fontSize: 30 },
			label: { marginTop: 5 },
			arrow: { marginTop: 15 }
		},
		homeStyle: { fontSize: 40, color: "white" }
	},
	{
		icon: "routines",
		label: "RUTINAS",
		screen: Screens.Routines,
		drawerStyle: {
			icon: { marginTop: 3, fontSize: 25 },
			arrow: { marginTop: 10 }
		},
		homeStyle: {
			fontSize: 30,
			paddingBottom: 10,
			color: "white"
		}
	},
	/*{
		icon: "classes",
		label: "MIS CLASES",
		screen: Screens.Classes,
		drawerStyle: {
			icon: { fontSize: 40, paddingLeft: 15 },
			label: { marginTop: 5 },
			arrow: { marginTop: 12 }
		}
	},*/
	{
		icon: "timetable",
		label: "HORARIOS",
		screen: Screens.Timetable,
		drawerStyle: {
			icon: { fontSize: 37, paddingLeft: 5 },
			label: { marginTop: 7 },
			arrow: { marginTop: 15 }
		},
		homeStyle: { fontSize: 40, color: "white" }
	},
	{
		icon: "messages",
		label: "MENSAJES",
		screen: Screens.Messages,
		drawerStyle: {
			icon: {
				fontSize: 28,
				paddingLeft: 4,
				marginTop: 3
			},
			arrow: {
				marginTop: 10
			}
		},
		homeStyle: {
			fontSize: 30,
			color: "white"
		}
	},
	{
		icon: "referrals",
		label: "REFERIDOS",
		screen: Screens.Referrals,
		drawerStyle: { label: { marginTop: 5 }, arrow: { marginTop: 13 } },
		homeStyle: { fontSize: 40, color: "white" }
	}
];

export const AnalitycsEventsLabels = {
	signOut: "cerró sesión",
	takeProfilePicture: "sacó foto de perfil",
	notificationReceivedOf: "recibió notificación de",
	messages: "mensajes",
	promotions: "promociones"
};

export const Notifications = {
	idFieldName: "notificationId"
};
