import {ActionsTypes} from "config/settings";

export function setBookedClasses(bookedClasses) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_BOOKED_CLASSES, bookedClasses});
  };
}

export function deleteBookedClass(id) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.REMOVE_BOOKED_CLASS, id});
  };
}
