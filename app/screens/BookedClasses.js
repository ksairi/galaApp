import React, {useCallback, useState, useEffect} from "react";
import {SectionList, Text, TouchableOpacity, Alert, View} from "react-native";
import * as ApiHelper from "helpers/ApiHelper";
import RootWrapper from "components/presentationals/RootWrapper";
import {Screens} from "config/settings";
import CentredWrapper from "components/presentationals/CentredWrapper";
import GenericText from "components/presentationals/GenericText";
import {connect} from "react-redux";
import ActionsCreators from "redux/actions/";

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
  useEffect(() => {
    let tempSortedClasses = [];
    const alreadyFiltered = [];
    bookedClasses.forEach(({date: filteredDate, day}) => {
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
            title: `${
              day.charAt(0).toUpperCase() + day.slice(1)
            } ${filteredDate}`,
            data: classesByDate,
          },
        ];
      }
      alreadyFiltered.push(filteredDate);
    });
    setSortedClasses(tempSortedClasses);
  }, [bookedClasses]);
  const deleteBooking = useCallback(({id, className, day, date, time}) => {
    Alert.alert(
      `Deseas borrar la reserva de ${className} el ${day} ${date} a ${time} ?`,
      "",
      [
        {
          text: "OK",
          onPress: async () => {
            try {
              await ApiHelper.deleteBooking({
                userId,
                bookingId: id,
                className,
                day,
                date,
                time,
              });
              dispatch(ActionsCreators.deleteBookedClass(id));
            } catch (e) {
              Alert.alert(e);
            }
          },
        },
        {text: "Cancelar", style: "cancel"},
      ]
    );
  }, []);
  const Item = ({className, time, id, date, day}) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{time}</Text>
      <Text style={styles.itemText}>{className}</Text>
      <TouchableOpacity
        onPress={() => deleteBooking({id, time, className, date, day})}
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
            onPress={() => navigation.navigate(Screens.ClassesToBook)}
          >
            <GenericText style={{fontSize: 18, marginTop: 20}}>
              Hacelo acá!
            </GenericText>
          </TouchableOpacity>
        </View>
      )}
    </RootWrapper>
  );
}

export default connect((state) => ({
  bookedClasses: state.bookedClasses,
  userId: state.userData.userId,
}))(BookedClasses);
