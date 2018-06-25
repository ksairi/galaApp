const SERVER_HOSTNAME_1 = __DEV__
	? "http://192.168.42.1:3000/"
	: "https://aqueous-harbor-62651.herokuapp.com/";

const SERVER_HOSTNAME_2 = __DEV__
	? "http://192.168.42.1:81/api/"
	: "http://galagym.com/api/";

exports.Urls = {
	LOGIN: SERVER_HOSTNAME_1 + "login",
	REGISTER: SERVER_HOSTNAME_1 + "register",
	RESET_PASSWORD: SERVER_HOSTNAME_1 + "resetPassword",
	SEND_COMMENTS: SERVER_HOSTNAME_1 + "sendComments",
	SEND_CLIENT_TOKEN: SERVER_HOSTNAME_1 + "sendClientToken",
	SYN_LOCAL_STORAGE: SERVER_HOSTNAME_1 + "syncLocalStorage",
	FETCH_USER_DATA: SERVER_HOSTNAME_1 + "fetchUserData",
	FETCH_DYNAMIC_DATA: SERVER_HOSTNAME_2 + "fetchDynamicData.php"
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
	INVALID_COMMENTS: "Por favor ingresá un comentario antes de enviar",
	SEND_COMMENTS_OK:
		"Recibimos tus comentarios. Te contactaremos si es necesario. Muchas Gracias",
	INCOMPLETE_INPUT_DATA: "Completá todos los campos antes de continuar",
	NO_SPACE_IN_DISK:
		"Espacio insuficiente. Por favor, elimine contenido para continuar."
};

exports.Labels = {
	SUBMIT: "Enviar",
	MAIL: "E-mail",
	ENTER_COMMENTS: "Queremos leer lo que tenés para decir"
};

exports.Screens = {
	CheckUserActivity: "CheckUserActivity",
	Welcome: "Welcome",
	SignIn: "SignIn",
	ResetPassword: "ResetPassword",
	SignUp: "SignUp",
	Home: "Home",
	Profile: "Profile",
	Routines: "Routines",
	Classes: "Classes",
	Timetable: "Timetable",
	Messages: "Messages",
	Referrals: "Referrals",
	LoginStack: "loginStack",
	HomeStack: "homeStack"
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
	SET_NOTIFICATIONS: "SET_NOTIFICATIONS",
	SET_NOTIFICATIONS_TOKEN: "SET_NOTIFICATIONS_TOKEN",
	SET_READ_NOTIFICATION: "SET_READ_NOTIFICATION",
	SET_NOTIFICATIONS_SYNC_FLAGS: "SET_NOTIFICATIONS_SYNC_FLAGS",
	// Routines
	SET_ROUTINES: "SET_ROUTINES",
	// Timetable
	SET_TIMETABLE: "SET_TIMETABLE",
	// User Data
	SET_USER_DATA: "SET_USER_DATA",
	SET_NEW_MEMBER_DATA: "SET_NEW_MEMBER_DATA",
	SET_IS_USING_CACHE: "SET_IS_USING_CACHE",
	SET_NEW_PASSWORD: "SET_NEW_PASSWORD",
	SET_NOTIFICATIONS_NEW_MEMBER_DATA: "SET_NOTIFICATIONS_NEW_MEMBER_DATA",
	//Session
	LOG_IN: "LOG_IN",
	LOG_OUT: "LOG_OUT",
	SET_IS_APPS_FIRST_TIME: "SET_IS_APPS_FIRST_TIME",
	SET_AUTO_LOGIN_ERROR_MESSAGE: "SET_AUTO_LOGIN_ERROR_MESSAGE",
	//Navigation
	SET_CURRENT_HOME_DRAWER_OPTION: "SET_CURRENT_HOME_DRAWER_OPTION",
	//Device
	SET_CURRENT_ORIENTATION: "SET_CURRENT_ORIENTATION",
	//Synched Images
	SET_LOGIN_IMAGES: "SET_LOGIN_IMAGES",
	SET_MAIN_MENU_IMAGES: "SET_MAIN_MENU_IMAGES",
	SET_PROMOTIONS: "SET_PROMOTIONS",
	SET_SYNCHED_IMAGES_PARAMETERS: "SET_SYNCHED_IMAGES_PARAMETERS",
	SET_ROUTINES_IMAGES: "SET_ROUTINES_IMAGES",
	SET_CLASSES_IMAGES: "SET_CLASSES_IMAGES",
	SET_TIMETABLE_IMAGES: "SET_TIMETABLE_IMAGES",
	LAST_SYNCHED_TIMESTAMP: "LAST_SYNCHED_TIMESTAMP"
};
