export default (handlers) => {
  return function notificationHandler(data) {
    if (handlers.hasOwnProperty(Object.keys(data)[0])){
      return handlers[Object.keys(data)[0]](data)
    } else {
      return null
    }
  }
}