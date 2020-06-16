import React, {useEffect, useState, useCallback} from "react";
import {
  SectionList,
  Text,
  TouchableOpacity,
  Alert,
  View,
  Platform,
} from "react-native";
import * as ApiHelper from "helpers/ApiHelper";
import LoadingSpinner from "components/presentationals/LoadingSpinner";
import RootWrapper from "components/presentationals/RootWrapper";
import {Screens} from "config/settings";
import CentredWrapper from "components/presentationals/CentredWrapper";
import GenericText from "components/presentationals/GenericText";
import Button from "components/presentationals/GenericButton";
import {connect} from "react-redux";
import moment from "moment";
import ActionsCreators from "redux/actions";

const styles = {
  item: {
    padding: 10,
    alignSelf: "center",
  },
  header: {
    color: "white",
    fontSize: 18,
    fontFamily: "lato-bold",
    marginTop: 20,
    alignSelf: "center",
  },
  classData: {
    flexDirection: "row",
  },
  classDataText: {
    color: "white",
    fontSize: 16,
    fontFamily: "lato-regular",
  },
  time: {width: 60},
  className: {width: 100},
  saloon: {width: 80},
  availability: {width: 100},
  border: {color: "red"},
  selected: {color: "green"},
};

function ClassesToBook({navigation, userId, bookedClasses, dispatch}) {
  const [classesToBook, setClassesToBook] = useState([]);
  const [checkoutClasses, setCheckoutClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingBookings, setAddingBookings] = useState(false);

  const fetchClassesToBook = useCallback(async () => {
    setClassesToBook([]);
    try {
      setLoading(true);
      const {
        classesToBook: remoteClassesToBook,
      } = await ApiHelper.getClassesToBook();
      Object.values(remoteClassesToBook).forEach((dayRecord) => {
        setClassesToBook((classesToBook) => [
          ...classesToBook,
          {
            title: dayRecord.dateData,
            data: dayRecord.classes,
          },
        ]);
      });
    } catch (e) {
      if (Platform.OS !== "web") {
        Alert.alert("", e, [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate(Screens.Home);
            },
          },
        ]);
      } else {
        window.alert(e);
        navigation.navigate(Screens.Home);
      }
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchClassesToBook();
  }, []);

  const checkoutBookings = useCallback(async () => {
    try {
      setAddingBookings(true);
      const result = await ApiHelper.newBookings({
        userId,
        bookings: checkoutClasses,
      });
      let alertMessage = "";
      if (result.errorMessages.length) {
        alertMessage = `Reserva(s) con errores:\n ${result.errorMessages.join(
          ".\n"
        )}`;
      }
      if (result.messages.length) {
        alertMessage = alertMessage.concat(
          `Reserva(s) con éxito:\n ${result.messages.join(".\n")}`
        );
      }
      const successfullBookings = result.successfullBookings.map(
        ({id, date, dow, className, time, saloon}) => ({
          id,
          date,
          dow,
          className,
          time,
          saloon,
        })
      );
      dispatch(ActionsCreators.addNewBookedClasses(successfullBookings));
      if (successfullBookings.length) {
        await fetchClassesToBook(successfullBookings);
      }
      setCheckoutClasses([]);
      if (Platform.OS !== "web") {
        Alert.alert(alertMessage, "", [
          {
            text: "OK",
            onPress: () => {
              if (!result.errorMessages.length) {
                navigation.navigate(Screens.BookedClasses);
              }
            },
          },
        ]);
      } else {
        window.alert(alertMessage);
        if (!result.errorMessages.length) {
          navigation.navigate(Screens.BookedClasses);
        }
      }
    } catch (e) {
      if (Platform.OS !== "web") {
        Alert.alert(e);
      } else {
        window.alert(e);
      }
    } finally {
      setAddingBookings(false);
    }
  });

  const editClassToCheckout = useCallback(
    (pItem) => {
      if (
        checkoutClasses.find(
          (item) =>
            item.date === pItem.date && item.className !== pItem.className
        )
      ) {
        const errMsg = "Se puede reservar una clase por día.";
        if (Platform.OS !== "web") {
          Alert.alert(errMsg);
        } else {
          window.alert(errMsg);
        }
        return;
      }

      if (bookedClasses.find((item) => item.date === pItem.date)) {
        const errMes = `Ya tenes una reserva para el día ${moment(
          pItem.date,
          "YYYY-MM-DD"
        ).format("DD/MM")}`;
        if (Platform.OS !== "web") {
          Alert.alert(errMes);
        } else {
          window.alert(errMes);
        }
        return;
      }
      const index = checkoutClasses.findIndex(
        (item) =>
          item.date === pItem.date &&
          item.className === pItem.className &&
          item.saloon === pItem.saloon
      );
      if (index >= 0) {
        setCheckoutClasses(
          checkoutClasses
            .slice(0, index)
            .concat(checkoutClasses.slice(index + 1))
        );
        return;
      }
      setCheckoutClasses((checkoutClases) => [...checkoutClases, pItem]);
    },
    [checkoutClasses]
  );

  const isSelected = useCallback(
    ({saloon, time, date}) => {
      return checkoutClasses.find(
        (item) =>
          item.saloon === saloon && item.time === time && item.date === date
      );
    },
    [checkoutClasses]
  );

  if (loading) {
    return (
      <RootWrapper>
        <LoadingSpinner visible={loading} />
      </RootWrapper>
    );
  }

  const Item = ({item, date, dow}) => {
    const ifNeededSelectedStyle = isSelected({...item, date, dow})
      ? styles.selected
      : null;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => editClassToCheckout({...item, date, dow})}
      >
        <View style={styles.classData}>
          <Text
            style={[styles.classDataText, styles.time, ifNeededSelectedStyle]}
          >
            {item.time}
          </Text>
          <Text
            style={[
              styles.classDataText,
              styles.className,
              ifNeededSelectedStyle,
            ]}
          >
            {item.className}
          </Text>
          <Text
            style={[styles.classDataText, styles.saloon, ifNeededSelectedStyle]}
          >
            {item.saloon}
          </Text>
          <Text
            style={[
              styles.classDataText,
              styles.availability,
              item.classAvailability - item.classBookings <= 3
                ? styles.border
                : null,
              ifNeededSelectedStyle,
            ]}
          >
            Cupos {item.classBookings}/{item.classAvailability}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <RootWrapper style={{padding: 0}}>
      {classesToBook.length > 0 ? (
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
            RESERVA DE CLASES
          </Text>
          <CentredWrapper>
            <SectionList
              keyExtractor={() => Math.random().toString()}
              sections={classesToBook}
              renderItem={({item, section}) => (
                <Item
                  {...{item}}
                  date={section.title.date}
                  dow={section.title.dow}
                />
              )}
              renderSectionHeader={({section}) => {
                return (
                  <Text style={styles.header}>
                    {section.title.dow}{" "}
                    {moment(section.title.date, "YYYY-MM-DD").format("DD/MM")}
                  </Text>
                );
              }}
            />
            {checkoutClasses.length > 0 && (
              <Button
                text={
                  addingBookings
                    ? "Reservando..."
                    : `Reserva ${checkoutClasses.length} ${
                        checkoutClasses.length === 1 ? "clase" : "clases"
                      }`
                }
                onPress={checkoutBookings}
              />
            )}
          </CentredWrapper>
        </>
      ) : (
        <View style={{flex: 1, alignItems: "center", marginTop: 50}}>
          <GenericText
            style={{
              fontFamily: "brother-1816-bold",
              fontSize: 22,
              color: "white",
              flex: -1,
            }}
          >
            ¡Ups!
          </GenericText>
          <GenericText style={{fontSize: 18}}>
            No hay clases para reservar aun!
          </GenericText>
        </View>
      )}
    </RootWrapper>
  );
}

export default connect((state) => ({
  bookedClasses: state.bookedClasses,
  userId: state.userData.userId,
}))(ClassesToBook);
