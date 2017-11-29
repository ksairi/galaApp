const SERVER_HOSTNAME = "http://www.galagym.com/"

exports.Urls = {
  LOGIN: SERVER_HOSTNAME + "login",
  REGISTER: SERVER_HOSTNAME + "register",
}

exports.Messages = {
	INVALID_USER_PASSWORD:"Ingresá el DNI y tu contraseña para continuar",
  INVALID_USER_FULLNAME:"Ingresá tu nombre completo",
  INVALID_CONFIRM_PASSWORD:"Las contraseñas no coinciden",
  SERVER_ERROR:"Error de conexión. Por favor intentá en unos minutos.",
  CHECK_INTERNET_CONNECTION:"Verificá tu conexión de internet",
  LOADING:"Cargando"
}

exports.Labels = {
  ENTER_USER_ID: "DNI",
  ENTER_PASSWORD: "Contraseña",
  SIGN_IN: "Iniciá Sesión",
  SIGN_UP: "Registrate",
  ENTER_FULL_NAME: "Nombre Completo",
  CONFIRM_PASSWORD: "Confirmá contraseña",

}

exports.Screens = {
  Init:"Init",
  SignIn:"SignIn",
  SignUp:"SignUp",
  Home: "Home"
}