import React, {useEffect, useState} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import RootWrapper from "components/presentationals/RootWrapper";
import {Screens} from "config/settings";
import CentredWrapper from "components/presentationals/CentredWrapper";
import GenericText from "components/presentationals/GenericText";
import moment from "moment";

const styles = {
  item: {
    padding: 10,
  },
  name: {
    color: "white",
  },
};

export default ({navigation, route}) => {
  const [filteredRecordings, setFilteredRecordings] = useState([]);
  useEffect(() => {
    let recordingsToShow = [];
    const classesByName = route.params.classes;
    classesByName.forEach(({name, url}) => {
      const dateToSearch = name
        .substring(name.indexOf("-") + 1, name.indexOf("-") + 9)
        .trim();
      const classesByDate = classesByName.filter(
        ({name}) =>
          name
            .substring(name.indexOf("-") + 1, name.indexOf("-") + 9)
            .trim() === dateToSearch
      );

      if (!recordingsToShow.find(({date}) => dateToSearch === date)) {
        recordingsToShow = [
          ...recordingsToShow,
          {
            date: dateToSearch,
            url,
            classes: classesByDate,
          },
        ];
      }
    });

    recordingsToShow.sort((a, b) => {
      const dateA = moment(a.date, "DD-MM-YY");
      const dateB = moment(b.date, "DD-MM-YY");
      if (dateA.isSameOrAfter(dateB)) {
        return -1;
      }
      if (dateA.isSameOrBefore(dateB)) {
        return 1;
      }
      return 0;
    });
    setFilteredRecordings(recordingsToShow);
  }, []);

  const Item = ({date, url, classes}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        if (classes.length > 1) {
          navigation.navigate(Screens.RecordedClassesByTime, {
            screen: Screens.RecordedClassesByTime,
            params: {
              classes,
              name: `${route.params.name} - ${date}`,
            },
          });
        } else {
          navigation.navigate(Screens.VideoPlayer, {
            url,
            title: `${route.params.name} - ${date}`,
            backScreen: Screens.RecordedClassesByDate,
          });
        }
      }}
    >
      <Text style={styles.name}>{date}</Text>
    </TouchableOpacity>
  );
  return (
    <RootWrapper style={{padding: 0}}>
      {filteredRecordings.length > 0 ? (
        <CentredWrapper>
          <FlatList
            data={filteredRecordings}
            renderItem={({item}) => (
              <Item date={item.date} url={item.url} classes={item.classes} />
            )}
            keyExtractor={() => Math.random().toString()}
            style={{marginTop: 20}}
          />
        </CentredWrapper>
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
    </RootWrapper>
  );
};
