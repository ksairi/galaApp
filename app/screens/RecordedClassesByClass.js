import React, {useEffect, useState} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import * as ApiHelper from "helpers/ApiHelper";
import LoadingSpinner from "components/presentationals/LoadingSpinner";
import RootWrapper from "components/presentationals/RootWrapper";
import {Screens, AnalitycsEventsLabels} from "config/settings";
import CentredWrapper from "components/presentationals/CentredWrapper";
import GenericText from "components/presentationals/GenericText";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import Alert from "components/presentationals/Alert";

const styles = {
  item: {
    padding: 10,
    alignSelf: "center",
  },
  name: {
    color: "white",
  },
};

export default ({navigation}) => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchRecordedClasses = async () => {
      AnalyticsHelper.setEvent(AnalitycsEventsLabels.recordedClasses);
      try {
        setLoading(true);
        const recordings = await ApiHelper.getRecordedClasses();
        setRecordings(recordings);
        setLoading(false);
      } catch (e) {
        setErrorMessage(errorMessage);
      }
    };
    fetchRecordedClasses();
  }, []);

  if (loading) {
    return (
      <RootWrapper>
        <LoadingSpinner visible={loading} />
      </RootWrapper>
    );
  }

  const Item = ({name, classes}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate(Screens.RecordedClassesByDate, {
          screen: Screens.RecordedClassesByDate,
          params: {classes, name},
        })
      }
    >
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
  let filteredRecordings = [];
  recordings.forEach(({name}) => {
    const searchedClassName = name.substring(0, name.indexOf("-")).trim();
    const classesByName = recordings.filter(
      ({name}) =>
        name.substring(0, name.indexOf("-")).trim() === searchedClassName.trim()
    );
    if (
      !filteredRecordings.find(
        (item) => item.name.trim() === searchedClassName.trim()
      )
    ) {
      filteredRecordings = [
        ...filteredRecordings,
        {name: searchedClassName.trim(), classes: classesByName},
      ];
    }
    filteredRecordings.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  });

  return (
    <RootWrapper style={{padding: 0}}>
      {filteredRecordings.length > 0 ? (
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
            CLASES GRABADAS
          </Text>
          <CentredWrapper>
            <FlatList
              data={filteredRecordings}
              renderItem={({item}) => (
                <Item name={item.name} classes={item.classes} />
              )}
              keyExtractor={() => Math.random().toString()}
              style={{marginTop: 20}}
            />
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
            No hay clases grabadas aun!
          </GenericText>
        </View>
      )}
      <Alert
        show={!!errorMessage}
        message={errorMessage}
        onConfirmPressed={() => {
          navigation.navigate(Screens.Home);
          setErrorMessage(null);
        }}
      />
    </RootWrapper>
  );
};
