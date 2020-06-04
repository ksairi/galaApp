import {Notifications} from "config/settings";

export default (handlers) =>
  function notificationHandler(data) {
    const handlerName = data[Notifications.handlerFieldName];
    if (handlerName && handlers.hasOwnProperty(handlerName)) {
      return handlers[handlerName](data);
    }
    return null;
  };
