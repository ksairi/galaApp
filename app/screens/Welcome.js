import React from "react";
import {View, TouchableOpacity, Linking, Platform} from "react-native";
import * as Animatable from "react-native-animatable-promise";
import Button from "components/presentationals/GenericButton";
import Text from "components/presentationals/GenericText";
import {connect} from "react-redux";
import {Screens} from "config/settings";
import ActionsCreators from "redux/actions";
import RootWrapper from "components/presentationals/RootWrapper";
import CentredWrapper from "components/presentationals/CentredWrapper";
import Logo from "components/presentationals/Logo";
import AnalyticsHelper from "helpers/AnalyticsHelper";

const AnimatedLogo = Animatable.createAnimatableComponent(Logo);
const AnimatedText = Animatable.createAnimatableComponent(Text);
const AnimatedButton = Animatable.createAnimatableComponent(Button);

const styles = {
  welcome: {
    fontSize: 22,
    flex: 0.7,
    color: "white",
    fontFamily: "brother-1816-bold",
  },

  welcomeDescription: {
    fontSize: 20,
    color: "white",
    paddingRight: 10,
    flex: 0.9,
    fontFamily: "lato-regular",
  },
  landscapeStyle: {
    logo: {
      marginTop: 20,
      flex: 0.7,
    },
  },
};
@connect((state) => ({
  orientation: state.currentOrientation,
}))
export default class Welcome extends React.PureComponent {
  state = {
    componentsStyle: null,
  };

  handleAnimatedLogo = (ref) => (this.animatedLogo = ref);

  handleAnimatedTitle = (ref) => (this.animatedTitle = ref);

  handleAnimatedBody = (ref) => (this.animatedBody = ref);

  handleAnimatedButton = (ref) => (this.animatedButton = ref);

  handleAnimatedImage1 = (ref) => (this.animatedImage1 = ref);

  handleAnimatedImage2 = (ref) => (this.animatedImage2 = ref);

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.orientation) {
      if (nextProps.orientation === "landscape") {
        return {componentsStyle: styles.landscapeStyle};
      }
      return {componentsStyle: {}};
    }
    return prevState;
  }

  componentDidMount() {
    AnalyticsHelper.setPageHit(Screens.Welcome);
    const duration = 2000;
    this.animatedLogo.bounceInLeft(duration);
    this.animatedTitle.bounceInRight(duration);
    this.animatedBody.bounceInLeft(duration);
    this.animatedButton.bounceInRight(duration);
    if (this.animatedImage1) {
      this.animatedImage1.bounceInRight(duration);
      this.animatedImage2.bounceInLeft(duration);
    }
  }

  goToLogin = () => {
    this.props.dispatch(ActionsCreators.setIsAppsFirstTime(false));
    this.props.navigation.navigate(Screens.LoginStack);
  };

  render() {
    return (
      <RootWrapper>
        <CentredWrapper>
          <AnimatedLogo
            useNativeDriver
            style={[
              {flex: 0.7, fontSize: 75, marginTop: 50},
              this.state.componentsStyle.logo,
            ]}
            ref={this.handleAnimatedLogo}
          />
          <View style={{flex: 0.65}}>
            <AnimatedText
              useNativeDriver
              style={styles.welcome}
              ref={this.handleAnimatedTitle}
            >
              ¡BIENVENIDO!
            </AnimatedText>
            <AnimatedText
              useNativeDriver
              style={styles.welcomeDescription}
              ref={this.handleAnimatedBody}
            >
              Dentro de la app podrás encontrar tus rutinas, clases y todas
              nuestras novedades para disfrutar aún más tu gimnasio.
            </AnimatedText>
          </View>
          <View style={{flex: 1}}>
            {Platform.OS === "web" && (
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  paddingBottom: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      "https://apps.apple.com/us/app/gala/id1449314757"
                    )
                  }
                >
                  <Animatable.Image
                    useNativeDriver
                    ref={this.handleAnimatedImage1}
                    source={require("../assets/images/app-store-badge.png")}
                    style={{
                      height: 60,
                      width: 110,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      "https://play.google.com/store/apps/details?id=com.gala.galaapp"
                    )
                  }
                >
                  <Animatable.Image
                    useNativeDriver
                    ref={this.handleAnimatedImage2}
                    source={require("../assets/images/google-play-badge.png")}
                    style={{
                      height: 60,
                      width: 150,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}

            <AnimatedButton
              useNativeDriver
              textStyle={{fontFamily: "brother-1816-bold", fontSize: 21}}
              text="EXPLORÁ LA APP"
              onPress={this.goToLogin}
              ref={this.handleAnimatedButton}
            />
          </View>
        </CentredWrapper>
      </RootWrapper>
    );
  }
}
