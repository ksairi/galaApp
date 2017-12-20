const SERVER_HOSTNAME = "http://192.168.42.46:3000/"

exports.Urls = {
  LOGIN:SERVER_HOSTNAME + "login",
  REGISTER:SERVER_HOSTNAME + "register",
  RESET_PASSWORD:SERVER_HOSTNAME + "resetPassword",
} 

exports.Messages = {
	INVALID_USER_ID_PASSWORD:"Ingresá el DNI y tu contraseña para continuar.",
  INVALID_USER_FULLNAME:"Ingresá tu nombre completo.",
  INVALID_CONFIRM_PASSWORD:"Las contraseñas no coinciden.",
  SERVER_ERROR:"Error de conexión a nuestros servidores. Por favor reintentá en unos minutos.",
  CHECK_INTERNET_CONNECTION:"Verificá tu conexión de internet.",
  LOADING:"Cargando...",
  NO_ACCOUNT:"¿No te registraste?",
  FORGOT_PASSWORD:"¿Olvidaste la contraseña?",
  USER_ALREADY:"¿Ya tenes una cuenta?",
  INVALID_PASSWORD_LENGTH:"La contraseña debe tener al menos 5 caracteres.",
  INVALID_USER_ID_LENGTH:"DNI inválido.",
  INVALID_MAIL:"E-mail inválido.",
  SUCCESSFULY_RESET_PASSWORD: "Contraseña actualizada. Por favor logueate nuevamente",
  RESET_PASSWORD_EXPLANATION: "Por favor ingresá el DNI y la nueva contraseña.",
  SYSTEM_ERROR: "Error al guardar información en el dispositivo. Vuelva a intentarlo nuevamente",
}

exports.Labels = {
  ENTER_USER_ID: "DNI",
  ENTER_PASSWORD: "Contraseña",
  SIGN_IN: "Iniciá Sesión",
  SIGN_UP: "Registrate",
  ENTER_FULL_NAME: "Nombre Completo",
  CONFIRM_PASSWORD: "Confirmá contraseña",
  SUBMIT:"Enviar",
  ENTER_MAIL: "E-mail",
  GO_BACK_TO_SIGN_IN:"Iniciá sesión",
  HOME:"Home"

}

exports.Screens = {
  Init:"Init",
  SignIn:"SignIn",
  ResetPassword:"ResetPassword",  
  SignUp:"SignUp",
  Home: "Home",
  Contact:"Contact",
  TimeTable:"TimeTable",
  Routines:"Routines",
  Notifications:"Notifications",
  LoginStack:"loginStack",
  HomeDrawerStack:"homeDrawerStack"
}

exports.SignUpConstraints = {
  PASSWORD_MIN_LENGTH:5,
  USER_ID_MIN_LENGTH:7
}

exports.ServerProtocol = {
  statusField:"status",
  OK:"ok",
  messageField:"message"
}

exports.Keys = {
  userData:"userData",
  timeTable:"timeTable"
}