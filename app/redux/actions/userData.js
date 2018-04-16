import { ActionsTypes, ServerProtocol } from '/config/settings'
import { fetchUserData } from '/helpers/ApiHelper'

export function setUserData(userData){
  
  return (dispatch, getState) => {
    
    dispatch({type:ActionsTypes.SET_USER_DATA, [ServerProtocol.userData]:userData})
  }
}

export function setNewMemberData(newMemberData){
  return(dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_NEW_MEMBER_DATA, [ServerProtocol.newMemberData]:newMemberData})
  }
}

export function setNotificationsNewMemberData(notificationsNewMemberData){
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_NOTIFICATIONS_NEW_MEMBER_DATA, [ServerProtocol.notificationsNewMemberData]:notificationsNewMemberData})
  }
}

export function setIsUsingCache(isUsingCache){
  return (dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_IS_USING_CACHE, isUsingCache})
  }
}

export function fetchUserStore(){
  return (dispatch, getState) => {
    fetchUserData(getState()[ServerProtocol.userData][ServerProtocol.userId])
    .then(response =>{
      response = response.data
      dispatch({type: ActionsTypes.SET_NOTIFICATIONS, [ServerProtocol.notifications]:response.notifications})
      dispatch({type: ActionsTypes.SET_ROUTINES, [ServerProtocol.routines]:response.routines})
      dispatch({type: ActionsTypes.SET_TIMETABLE, [ServerProtocol.timetable]:response.timetable})
    },
    error =>{
      console.log(error)
      //TODO SHOW AN ERROR SOMEWHERE IN THE SCREEN
    })
    
  }
}

export function setUserNewPassword(password){
  return(dispatch, getState) => {
    dispatch({type:ActionsTypes.SET_NEW_PASSWORD, password})
  }
}