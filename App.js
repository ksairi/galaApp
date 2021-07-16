import React from "react";
import {LogBox} from "react-native";
import {Provider} from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {PersistGate} from "redux-persist/integration/react";
import AppContainer from "redux/AppContainer";
import configureStore from "redux/configureStore";
import Splash from "components/presentationals/Splash";
import {SafeAreaProvider} from "react-native-safe-area-context";

const {store, persistor} = configureStore();

export default class App extends React.Component {
  state = {
    haveResourcesLoaded: false,
    showSplashImage: false,
  };

  constructor(props) {
    super(props);
    SplashScreen.preventAutoHide();
  }

  componentDidMount() {
    this._cacheResourcesAsync()
      .then(() => {
        this.setState({showSplashImage: true, haveResourcesLoaded: true});
        this.startCounter();
      })
      .catch(() => {});
  }

  // eslint-disable-next-line class-methods-use-this
  _cacheResourcesAsync() {
    return Font.loadAsync({
      "lato-regular": require("assets/fonts/Lato-Regular.ttf"),
      "lato-bold": require("assets/fonts/Lato-Bold.ttf"),
      "brother-1816-bold": require("assets/fonts/Brother-1816-Bold.otf"),
      Roboto: require("assets/fonts/Roboto-Regular.ttf"),
      icomoon: require("assets/fonts/icomoon.ttf"),
    });
  }

  onSplashImageLoad = () => {
    SplashScreen.hide();
  };

  startCounter = () => {
    setTimeout(() => {
      this.setState({showSplashImage: false});
    }, 2000);
  };

  render() {
    const {haveResourcesLoaded, showSplashImage} = this.state;
    if (!haveResourcesLoaded) {
      return null;
    }
    if (showSplashImage) {
      return <Splash onSplashImageLoad={this.onSplashImageLoad} />;
    }
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate
            loading={<Splash onSplashImageLoad={this.onSplashImageLoad} />}
            persistor={persistor}
          >
            <AppContainer />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
if (LogBox) {
  LogBox.ignoreAllLogs(true);
}
