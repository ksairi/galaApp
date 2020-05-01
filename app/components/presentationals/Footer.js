import React from "react";
import {View, Linking} from "react-native";
import Button from "components/presentationals/GenericButton";
import Icon from "helpers/ImageHelper";
import GenericText from "components/presentationals/GenericText";
import {FontAwesome} from "@expo/vector-icons";

const styles = {
  button: {
    backgroundColor: "#12194d",
    width: 70,
    height: 70,
    marginRight: 20,
  },
  text: {
    fontSize: 14,
    fontFamily: "lato-bold",
    flex: -1,
  },
};

export default class Footer extends React.PureComponent {
  openUrl = (url) => () => {
    Linking.openURL(url);
  };

  render() {
    const iconFontSize = 30;
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: "row", flex: -1, paddingTop: 20}}>
          <Button
            buttonStyle={styles.button}
            onPress={this.openUrl("https://www.instagram.com/gala.gym/")}
          >
            <Icon name="instagram" size={iconFontSize} color="white" />
          </Button>
          <Button
            buttonStyle={styles.button}
            onPress={this.openUrl(
              "https://www.youtube.com/channel/UCFxjOj3tJ3Zfe9nEKNzCyDw"
            )}
          >
            <FontAwesome name="youtube" size={37} color="white" />
          </Button>
          <Button
            buttonStyle={styles.button}
            onPress={this.openUrl(
              "https://www.facebook.com/pg/GalaGymBA/posts/"
            )}
          >
            <Icon name="facebook" size={iconFontSize} color="white" />
          </Button>
        </View>
        <View
          style={{flex: -1, alignItems: "center", justifyContent: "center"}}
        >
          <GenericText style={styles.text}>WWW.GALAGYM.COM</GenericText>
          <GenericText style={styles.text}>
            ALL RIGHTS RESERVED GALA 2018
          </GenericText>
        </View>
      </View>
    );
  }
}
