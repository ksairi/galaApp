import React, {useState, useCallback} from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import RootWrapper from "components/presentationals/RootWrapper";
import {Screens} from "config/settings";
import CentredWrapper from "components/presentationals/CentredWrapper";
import GenericText from "components/presentationals/GenericText";
import {useFocusEffect} from "@react-navigation/native";
import {useDimensions} from "@react-native-community/hooks";

const styles = {
  item: {
    padding: 10,
  },
  name: {
    color: "white",
  },
};

export default ({navigation, route}) => {
  const [classes, setClasses] = useState([]);
  const maxHeight = useDimensions().window.height - 50;
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(Screens.RecordedClassesByDate);
        return true;
      };
      setClasses(route.params.classes.map(({name, url}) => ({name, url})));

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [route.params])
  );

  const Item = ({name, url}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate(Screens.VideoPlayer, {
          url,
          title: `${route.params.name} - ${name.substr(-5)}`,
          backScreen: Screens.RecordedClassesByTime,
        })
      }
    >
      <Text style={styles.name}>{name.substr(-5)}</Text>
    </TouchableOpacity>
  );
  return (
    <RootWrapper style={{padding: 0, maxHeight}}>
      {classes.length > 0 ? (
        <CentredWrapper>
          <FlatList
            data={classes}
            renderItem={({item}) => <Item name={item.name} url={item.url} />}
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
