import {sendMessages as sendMessagesApi} from "helpers/ApiHelper";
import {saveMessagesToDevice} from "helpers/StoreHelper";

export const sendMessages = async (userId, messages, dispatch) => {
  const sentMessages = await sendMessagesApi({userId, messages});
  saveMessagesToDevice(null, sentMessages, dispatch);
};

export const getUnsentMessages = (messages) => {
  if (messages != null) {
    const unsentMessages = messages.filter((message) => !message.serverTime);
    return unsentMessages.reverse();
  }
  return null;
};

export const sendUnsentMessages = async (userId, messages, dispatch) => {
  const unsentMessages = getUnsentMessages(messages);
  if (unsentMessages != null && unsentMessages.length > 0) {
    const sentMessages = await sendMessagesApi({
      userId,
      messages: unsentMessages,
    });
    if (sentMessages) {
      saveMessagesToDevice(null, sentMessages, dispatch);
    }
  }
};
