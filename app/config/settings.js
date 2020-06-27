import {Platform, Linking} from "react-native";
import {FontAwesome, Foundation} from "@expo/vector-icons";
import Constants from "expo-constants";
import {DEV_SERVER_HOSTNAME_1, DEV_SERVER_HOSTNAME_2} from "./devHosts";

const API_ROOT = "/api/";

const getServer2Environment = (path) => {
  const {slug} = Constants.manifest;
  return slug === "galaAppStaging"
    ? `https://test.galagym.com${API_ROOT}${path}`
    : `https://galagym.com${API_ROOT}${path}`;
};

const getServerHostName2 = (path) => {
  if (Platform.OS === "web") {
    if (__DEV__) {
      return API_ROOT.concat(path);
    }
  }
  if (__DEV__) {
    return `${DEV_SERVER_HOSTNAME_2}${API_ROOT}${path}`;
  }
  return getServer2Environment(path);
};

const getServer1Environment = (path) => {
  const {slug} = Constants.manifest;
  const port = slug === "galaAppStaging" ? "1083" : "1082";
  return `http://galagym.sytes.net:${port}/${path}`;
};

const API_ROOT2 = "/api2/";

const getServerHostName1 = (path) => {
  const noPhpPath = path.replace(".php", "");
  if (Platform.OS === "web") {
    if (__DEV__) {
      return API_ROOT2.concat(noPhpPath);
    }
    return getServer2Environment(path);
  }
  if (__DEV__) {
    return `${DEV_SERVER_HOSTNAME_1}/${noPhpPath}`;
  }
  return getServer1Environment(noPhpPath);
};

export const Urls = {
  LOGIN: getServerHostName1("login.php"),
  REGISTER: getServerHostName1("register.php"),
  RESET_PASSWORD: getServerHostName1("resetPassword.php"),
  FETCH_USER_DATA: getServerHostName1("fetchUserData.php"),
  SEND_REFERRAL: getServerHostName2("sendReferral.php"),
  FETCH_DYNAMIC_DATA: getServerHostName2("fetchDynamicData.php"),
  SET_CONTENT_SAVED: getServerHostName2("setContentSaved.php"),
  SEND_MESSAGES: getServerHostName2("sendMessages.php"),
  SET_NOTIFIED_MESSAGES_SAVED: getServerHostName2(
    "setNotifiedMessagesSaved.php"
  ),
  GET_REAL_TIME_MESSAGES: getServerHostName2("getRealTimeMessages.php"),
  SET_REAL_TIME_MESSAGES_SAVED: getServerHostName2(
    "setRealTimeMessagesSaved.php"
  ),
  UPLOAD_PROFILE_PICTURE: getServerHostName2("uploadProfilePicture.php"),
  PROFILE_PICTURES: getServerHostName2("profile_pictures/"),
  SYNCH_MEMBER_PROPERTIES: getServerHostName2("synchMemberProperties.php"),
  GET_RECORDED_CLASES: getServerHostName2("getRecordedClasses.php"),
  GET_MEETING_ID: getServerHostName2("getMeetingId.php"),
  DELETE_BOOKING: getServerHostName2("deleteClassBookings.php"),
  GET_CLASSES_TO_BOOK: getServerHostName2("getClassesToBook.php"),
  NEW_CLASSES_BOOKINGS: getServerHostName2("newClassesBookings.php"),
  GET_AFFIDAVIT_QUESTIONS: getServerHostName2("getAffidavitQuestions.php"),
};

export const Messages = {
  INVALID_USER_ID_PASSWORD: "Ingresá tu DNI y contraseña para continuar",
  INVALID_CONFIRM_PASSWORD: "Las contraseñas no coinciden",
  PASSWORD_TOO_EASY: "Por favor elija otra contraseña",
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
  INCOMPLETE_INPUT_DATA: "Completá todos los campos antes de continuar",
  NO_SPACE_IN_DISK:
    "Espacio insuficiente. Por favor, elimine contenido para continuar.",
};

export const Labels = {
  SUBMIT: "Enviar",
  MAIL: "E-mail",
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
  NewMember: "NewMember",
  VideoPlayer: "VideoPlayer",
  LiveClassStudio1: "LiveClassStudio1",
  LiveClassStudio2: "LiveClassStudio2",
  LiveClassStudio3: "LiveClassStudio3",
  RecordedClassesByClass: "RecordedClassesByClass",
  RecordedClassesByDate: "RecordedClassesByDate",
  RecordedClassesByTime: "RecordedClassesByTime",
  SuggestAppDownload: "SuggestAppDownload",
  BookedClasses: "BookedClasses",
  ClassesToBook: "ClassesToBook",
  Affidavit: "Affidavit",
  PayMonthlyFee: "PayMonthlyFee",
};

export const SignUpConstraints = {
  PASSWORD_MIN_LENGTH: 5,
  USER_ID_MIN_LENGTH: 7,
};

export const ServerProtocol = {
  statusField: "status",
  OK: "ok",
  messageField: "message",
};

export const ActionsTypes = {
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
  SET_LAST_DATE_SHOWING_FREE_PASS_ENDING:
    "SET_LAST_DATE_SHOWING_FREE_PASS_ENDING",
  // Session
  LOG_IN: "LOG_IN",
  LOG_OUT: "LOG_OUT",
  SET_IS_APPS_FIRST_TIME: "SET_IS_APPS_FIRST_TIME",
  SET_HAS_RESET_FIRST_PASSWORD: "SET_HAS_RESET_FIRST_PASSWORD",
  SET_IN_RESET_FIRT_PASSWORD_MODE: "SET_IN_RESET_FIRT_PASSWORD_MODE",
  SET_IS_SAVING_NOTIFICATIONS_DATA: "SET_IS_SAVING_NOTIFICATIONS_DATA",
  SET_LAST_TIME_SUGGESTED_DOWNLOAD: "SET_LAST_TIME_SUGGESTED_DOWNLOAD",

  // Navigation
  SET_CURRENT_HOME_DRAWER_OPTION: "SET_CURRENT_HOME_DRAWER_OPTION",
  // Device
  SET_CURRENT_ORIENTATION: "SET_CURRENT_ORIENTATION",
  SET_DEVICE_ID: "SET_DEVICE_ID",
  // Synched Data
  SET_LOGIN_IMAGES: "SET_LOGIN_IMAGES",
  SET_MAIN_MENU_IMAGES: "SET_MAIN_MENU_IMAGES",
  SET_SYNCHED_DATA_PARAMETERS: "SET_SYNCHED_DATA_PARAMETERS",
  SET_CLASSES_IMAGES: "SET_CLASSES_IMAGES",
  SET_TIMETABLE_IMAGES: "SET_TIMETABLE_IMAGES",
  SET_LOGIN_SYNCHED_DATA_PARAMETERS: "SET_LOGIN_SYNCHED_DATA_PARAMETERS",
  SET_HIDDEN_STATUS_BAR: "SET_HIDDEN_STATUS_BAR",

  // Booked classes
  SET_BOOKED_CLASSES: "SET_BOOKED_CLASSES",
  REMOVE_BOOKED_CLASS: "REMOVE_BOOKED_CLASSES",
  ADD_NEW_BOOKED_CLASSES: "ADD_NEW_BOOKED_CLASSES",
};

const requiresMembership = {requiresActiveMember: true};

const liveClassProps = {
  icon: "video-camera",
  IconComponent: FontAwesome,
  drawerStyle: {
    icon: {marginTop: 5, fontSize: 30},
    label: {marginTop: 5},
    arrow: {marginTop: 15},
  },
  homeStyle: {fontSize: 40, color: "white"},
  ...requiresMembership,
};

const studio3Url = "https://www.instagram.com/gala.gym/?hl=es";

export const SectionsData = [
  {
    label: "VIVO ESTUDIO 1",
    params: {studioNumber: 1, title: "ESTUDIO 1"},
    screen: Screens.LiveClassStudio1,
    ...liveClassProps,
  },
  {
    label: "VIVO ESTUDIO 2",
    params: {studioNumber: 2, title: "ESTUDIO 2"},
    screen: Screens.LiveClassStudio2,
    ...liveClassProps,
  },
  {
    label: "VIVO ESTUDIO 3",
    screen: Screens.LiveClassStudio3,
    onPress: () =>
      Platform.OS === "web"
        ? window.open(studio3Url, "_blank")
        : Linking.openURL(studio3Url),
    ...liveClassProps,
  },
  {
    label: "CLASES GRABADAS",
    IconComponent: Foundation,
    icon: "record",
    drawerStyle: {
      ...liveClassProps.drawerStyle,
      icon: {...liveClassProps.drawerStyle.icon, fontSize: 50, paddingLeft: 0},
      label: {...liveClassProps.drawerStyle.label, fontSize: 17, marginTop: 15},
      arrow: {marginTop: 20},
    },
    homeStyle: {fontSize: 40, color: "white"},
    ...requiresMembership,
    screen: Screens.RecordedClassesByClass,
  },
  // {
  //   label: "TUS RESERVAS",
  //   ...requiresMembership,
  //   IconComponent: Foundation,
  //   icon: "bookmark",
  //   drawerStyle: {
  //     icon: {fontSize: 50, paddingLeft: 7},
  //     label: {marginTop: 5},
  //     arrow: {marginTop: 15},
  //   },
  //   homeStyle: {fontSize: 40, color: "white"},
  //   screen: Screens.BookedClasses,
  // },
  // {
  //   label: "RESERVA TUS CLASES",
  //   ...requiresMembership,
  //   IconComponent: Foundation,
  //   icon: "bookmark",
  //   drawerStyle: {
  //     icon: {fontSize: 50, paddingLeft: 7},
  //     label: {marginTop: 5},
  //     arrow: {marginTop: 15},
  //   },
  //   homeStyle: {fontSize: 40, color: "white"},
  //   screen: Screens.Affidavit,
  // },
  // {
  //   icon: 'exclamation',
  //   label: 'SOCIO NUEVO',
  //   screen: Screens.NewMember,
  //   IconComponent: FontAwesome,
  //   drawerStyle: {
  //     icon: { marginTop: 5, paddingLeft: 15, fontSize: 30 },
  //     label: { marginTop: 10, color: 'green', fontFamily: 'lato-regular' },
  //     arrow: { marginTop: 15 }
  //   },
  //   homeStyle: { fontSize: 40, color: 'white' }
  // },
  {
    icon: "user-icon",
    label: "MI PERFIL",
    screen: Screens.Profile,
    drawerStyle: {
      icon: {marginTop: 5, paddingLeft: 7, fontSize: 30},
      label: {marginTop: 5},
      arrow: {marginTop: 15},
    },
    homeStyle: {fontSize: 40, color: "white"},
  },
  {
    icon: "routines",
    label: "RUTINAS",
    screen: Screens.Routines,
    drawerStyle: {
      icon: {marginTop: 3, fontSize: 25},
      arrow: {marginTop: 10},
    },
    homeStyle: {
      fontSize: 30,
      paddingBottom: 10,
      color: "white",
    },
  },
  /* {
  icon: 'classes',
  label: 'MIS CLASES',
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
      icon: {fontSize: 37, paddingLeft: 5},
      label: {marginTop: 7},
      arrow: {marginTop: 15},
    },
    homeStyle: {fontSize: 40, color: "white"},
  },
  {
    icon: "messages",
    label: "MENSAJES",
    screen: Screens.Messages,
    drawerStyle: {
      icon: {
        fontSize: 28,
        paddingLeft: 4,
        marginTop: 3,
      },
      arrow: {
        marginTop: 10,
      },
    },
    homeStyle: {
      fontSize: 30,
      color: "white",
    },
  },
  {
    icon: "referrals",
    label: "REFERIDOS",
    screen: Screens.Referrals,
    drawerStyle: {
      label: {marginTop: 5},
      arrow: {marginTop: 13},
    },
    homeStyle: {fontSize: 40, color: "white"},
  },
];

export const AnalitycsEventsLabels = {
  signOut: "cerró sesión",
  takeProfilePicture: "sacó foto de perfil",
  notificationReceivedOf: "recibió notificación de",
  messages: "mensajes",
  routinesVideos: "video-rutinas-ejercicios",
  liveClass: "clase en vivo en zoom",
  recordedClasses: "clases grabadas",
};

export const Notifications = {
  handlerFieldName: "handler",
  idFieldName: "notificationId",
  destScreenFieldName: "destScreen",
};
