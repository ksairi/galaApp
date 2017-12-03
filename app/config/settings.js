const SERVER_HOSTNAME = "http://www.galagym.com/"

exports.Urls = {
  LOGIN: SERVER_HOSTNAME + "login",
  REGISTER: SERVER_HOSTNAME + "register",
}

exports.Messages = {
	INVALID_USER_ID_PASSWORD:"Ingresá el DNI y tu contraseña para continuar.",
  INVALID_USER_FULLNAME:"Ingresá tu nombre completo.",
  INVALID_CONFIRM_PASSWORD:"Las contraseñas no coinciden.",
  SERVER_ERROR:"Error de conexión. Por favor intentá en unos minutos.",
  CHECK_INTERNET_CONNECTION:"Verificá tu conexión de internet.",
  LOADING:"Cargando...",
  NO_ACCOUNT:"¿No te registraste?",
  FORGOT_PASSWORD:"¿Olvidaste la contraseña?",
  USER_ALREADY:"¿Ya tenes una cuenta?",
  INVALID_PASSWORD_LENGTH:"La contraseña debe tener al menos 5 caracteres.",
  INVALID_USER_ID_LENGTH:"DNI inválido."
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

exports.SignUpConstraints = {
  PASSWORD_MIN_LENGTH:5,
  USER_ID_MIN_LENGTH:7
}