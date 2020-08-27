import moment from "moment";

export const isMemberActive = ({routines, userData}) => {
  if (userData.freePassEndDate) {
    return (
      moment(userData.freePassEndDate, "DD/MM/YYYY").diff(moment(), "days") >= 0
    );
  } else {
    return routines.length > 0;
  }
};

export const RESTRICTED_PASSWORD = "gala";
