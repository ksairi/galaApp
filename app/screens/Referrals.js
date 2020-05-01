import React from "react";
import {Keyboard, View, TouchableWithoutFeedback} from "react-native";
import {connect} from "react-redux";
import RoundedTextInput from "components/presentationals/RoundedTextInput";
import GenericText from "components/presentationals/GenericText";
import LoadingSpinner from "components/presentationals/LoadingSpinner";
import {Messages, Screens} from "config/settings";
import {sendReferral} from "helpers/ApiHelper";
import RootWrapper from "components/presentationals/RootWrapper";
import {isMailValid} from "helpers/ValidationHelper";
import AnalyticsHelper from "helpers/AnalyticsHelper";
import {genericTextInputStyle} from "components/styles";

const styles = {
  hiddenKeyboardComponentsStyle: {
    rootWrapper: {justifyContent: "center"},
    title: {fontSize: 27},
    description: {fontSize: 25},
  },
  showingKeyboardComponentsStyle: {
    rootWrapper: {justifyContent: "flex-start"},
    title: {fontSize: 24, marginTop: 20},
    description: {fontSize: 22},
  },
  landscapeStyle: {
    textInput: {marginTop: 15},
  },
};

@connect((state) => ({
  userId: state.userData.userId,
  orientation: state.currentOrientation,
}))
export default class Referrals extends React.Component {
  state = {
    spinnerVisible: false,
    error: false,
    message: null,
    componentsStyle: styles.hiddenKeyboardComponentsStyle,
    mail: null,
    landscapeStyle: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.orientation === "landscape") {
      return {landscapeStyle: styles.landscapeStyle};
    }
    if (nextProps.orientation === "portrait") {
      return {landscapeStyle: {}};
    }

    return prevState;
  }

  componentDidMount() {
    AnalyticsHelper.setPageHit(Screens.Referrals);
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      componentsStyle: styles.showingKeyboardComponentsStyle,
    });
  };

  _keyboardDidHide = () => {
    this.setState({componentsStyle: styles.hiddenKeyboardComponentsStyle});
  };

  onFocus = () => {
    this.setState({message: null});
  };

  hideKeyboard = () => {
    Keyboard.dismiss();
  };

  onMailChange = (mail) => {
    this.setState({mail});
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.hideKeyboard}>
        <View style={{flex: 1}}>
          <RootWrapper style={this.state.componentsStyle.rootWrapper}>
            {(this.state.componentsStyle ===
              styles.hiddenKeyboardComponentsStyle ||
              this.props.orientation === "portrait") && (
              <View style={{flex: -1}}>
                <GenericText
                  style={[
                    {
                      fontFamily: "brother-1816-bold",
                      flex: -1,
                      paddingBottom: 10,
                    },
                    this.state.componentsStyle.title,
                    this.state.landscapeStyle.title,
                  ]}
                >
                  REFERIDOS
                </GenericText>
                <GenericText
                  style={[
                    {flex: -1, paddingBottom: 10},
                    this.state.componentsStyle.description,
                    this.state.landscapeStyle.description,
                  ]}
                >
                  Invitá a quien quieras y disfruten ambos de beneficios
                  exclusivos
                </GenericText>
              </View>
            )}

            <RoundedTextInput
              containerStyle={[
                {flex: -1, alignItems: "center"},
                this.state.landscapeStyle.textInput,
              ]}
              inputStyle={[genericTextInputStyle.input, {textAlign: "center"}]}
              inputProps={{
                placeholder: "INGRESÁ MAIL",
                autoFocus: true,
                onChangeText: this.onMailChange,
                onSubmitEditing: this.sendEmail,
                keyboardType: "email-address",
                returnKeyType: "send",
                autoCapitalize: "none",
                autoCorrect: false,
                value: this.state.mail,
                onFocus: this.onFocus,
              }}
            />
            {this.state.message && (
              <GenericText
                style={{
                  fontSize: 17,
                  flex: -1,
                  paddingTop: 10,
                }}
                error={this.state.error}
              >
                {this.state.message}
              </GenericText>
            )}
            <LoadingSpinner visible={this.state.spinnerVisible} />
          </RootWrapper>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  sendEmail = () => {
    Keyboard.dismiss();
    if (!isMailValid(this.state.mail)) {
      this.setState({message: Messages.INVALID_MAIL, error: true});
      return;
    }
    this.setState({spinnerVisible: true});
    if (this.props.userId !== null) {
      sendReferral(this.props.userId, this.state.mail)
        .then(() => {
          this.setState({
            // eslint-disable-next-line react/no-access-state-in-setstate
            message: `Listo! ${this.state.mail} comenzará a recibir nuestras promociones! `,
            error: false,
            mail: null,
            spinnerVisible: false,
          });
        })
        .catch((message) => {
          this.setState({
            message,
            error: true,
            spinnerVisible: false,
          });
        });
    } else {
      this.setState({
        message: Messages.SYSTEM_READ_ERROR,
        error: true,
        spinnerVisible: false,
      });
    }
  };
}
