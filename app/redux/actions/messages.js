import {ActionsTypes} from "config/settings";

export function setMessages(messages) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_MESSAGES,
      messages,
    });
  };
}

export function setSentMessages(messages) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_SENT_MESSAGES,
      messages,
    });
  };
}

export function setHasShownUnsentMessagesDialog() {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_HAS_SHOWN_UNSENT_MESSAGES_DIALOG,
    });
  };
}

export function deleteMessage(message) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.DELETE_MESSAGE,
      message,
    });
  };
}

export function setNewMessagesCount(value) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_NEW_MESSAGES_COUNT,
      value,
    });
  };
}
