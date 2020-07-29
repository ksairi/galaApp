import React, {useState, useEffect, useCallback} from "react";
import {
  SectionList,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
} from "react-native";
import * as ApiHelper from "helpers/ApiHelper";
import RootWrapper from "components/presentationals/RootWrapper";
import {Screens} from "config/settings";
import CentredWrapper from "components/presentationals/CentredWrapper";
import GenericText from "components/presentationals/GenericText";
import {connect} from "react-redux";
import ActionsCreators from "redux/actions";
import moment from "moment";
import Alert from "components/presentationals/Alert";
import {useFocusEffect} from "@react-navigation/native";

const styles = {
  item: {
    padding: 10,
    alignSelf: "center",
    flexDirection: "row",
    flex: 1,
  },
  itemText: {
    color: "white",
    paddingLeft: 5,
    fontSize: 16,
    fontFamily: "lato-regular",
  },
  removeBooking: {
    fontFamily: "lato-bold",
    paddingLeft: 25,
  },

  header: {
    fontFamily: "lato-bold",
    color: "white",
    fontSize: 20,
  },
};

function BookedClasses({navigation, bookedClasses, userId, dispatch}) {
  const [sortedClasses, setSortedClasses] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [onOKPress, setOnOKPress] = useState(null);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const showBookedClasses = useCallback(() => {
    let tempSortedClasses = [];
    const alreadyFiltered = [];
    bookedClasses.sort((a, b) => {
      const dateA = a.date;
      const dateB = b.date;
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });
    bookedClasses.forEach(({date: filteredDate, dow}) => {
      const classesByDate = bookedClasses.filter(
        ({date}) =>
          date === filteredDate && !alreadyFiltered.includes(filteredDate)
      );

      classesByDate.sort((a, b) => {
        const timeA = a.time;
        const timeB = b.time;
        if (timeA < timeB) {
          return -1;
        }
        if (timeA > timeB) {
          return 1;
        }
        return 0;
      });
      if (classesByDate.length > 0) {
        tempSortedClasses = [
          ...tempSortedClasses,
          {
            title: `${dow.charAt(0).toUpperCase() + dow.slice(1)} ${moment(
              filteredDate,
              "YYYY-MM-DD"
            ).format("DD/MM")}`,
            data: classesByDate,
          },
        ];
      }
      alreadyFiltered.push(filteredDate);
    });
    setSortedClasses(tempSortedClasses);
  }, [bookedClasses]);

  useFocusEffect(showBookedClasses);

  useEffect(() => {
    showBookedClasses();
  }, [bookedClasses]);

  const doDelete = async ({id, userId, className, dow, date, time}) => {
    const {message, errorMessage} = await ApiHelper.deleteBooking({
      userId,
      bookingId: id,
      className,
      dow,
      date,
      time,
    });
    dispatch(ActionsCreators.deleteBookedClass(id));
    return {message, errorMessage};
  };
  const Item = ({className, time, id, date, dow}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{time}</Text>
      <Text style={styles.itemText}>{className}</Text>
      <TouchableOpacity
        onPress={() => {
          setAlertMessage(
            `Deseas borrar la reserva de ${className} el ${dow} ${moment(
              date,
              "YYYY-MM-DD"
            ).format("DD/MM")} a ${time} ?`
          );
          setOnOKPress(() => async () => {
            setShowProgress(true);
            try {
              const {message, errorMessage} = await doDelete({
                userId,
                id,
                time,
                className,
                date,
                dow,
              });
              setAlertMessage(message || errorMessage);
            } catch (e) {
              setAlertMessage(e);
            } finally {
              setShowCancelButton(false);
              setOnOKPress(() => () => setAlertMessage(null));
              setShowProgress(false);
            }
          });
          setShowCancelButton(true);
        }}
      >
        <Text style={[styles.itemText, styles.removeBooking]}>Borrar</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <RootWrapper style={{padding: 0}}>
      {sortedClasses.length > 0 ? (
        <>
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              marginVertical: 10,
              fontSize: 18,
              fontFamily: "lato-regular",
            }}
          >
            TUS CLASES RESERVADAS
          </Text>
          <CentredWrapper>
            <SectionList
              sections={sortedClasses}
              renderItem={({item}) => <Item {...item} />}
              keyExtractor={(item, index) => item + index}
              renderSectionHeader={({section: {title}}) => (
                <Text style={styles.header}>{title}</Text>
              )}
              style={{marginTop: 20}}
            />
          </CentredWrapper>
        </>
      ) : (
        <View style={{flex: 1, alignItems: "center", marginTop: 50}}>
          <View>
            <GenericText
              style={{
                fontFamily: "lato-regular",
                fontSize: 22,
                color: "white",
                flex: -1,
              }}
            >
              No reservaste tus clases!
            </GenericText>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(Screens.Affidavit)}
          >
            <GenericText style={{fontSize: 18, marginTop: 20}}>
              Hacelo acá!
            </GenericText>
          </TouchableOpacity>
        </View>
      )}
      <Alert
        {...{showCancelButton, showProgress}}
        show={!!alertMessage}
        message={alertMessage}
        onConfirmPressed={() => {
          if (onOKPress) {
            onOKPress();
            setOnOKPress(null);
          }
        }}
        onCancelPressed={() => {
          setAlertMessage(null);
        }}
        contentContainerStyle={
          Platform.OS === "web"
            ? {
                left: Dimensions.get("window").width / 2,
                bottom: 400,
                width: 200,
              }
            : {}
        }
      />
    </RootWrapper>
  );
}

export default connect((state) => ({
  bookedClasses: state.bookedClasses,
  userId: state.userData.userId,
}))(BookedClasses);
