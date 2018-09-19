import React from "react";
import { Keyboard, View } from "react-native";
import { connect } from "react-redux";
import { RkTextInput, RkTheme } from "react-native-ui-kitten";
import GenericText from "/components/presentationals/GenericText";
import LoadingSpinner from "/components/presentationals/LoadingSpinner";
import { Messages } from "/config/settings";
import { sendReferral } from "/helpers/ApiHelper";
import RootWrapper from "/components/presentationals/RootWrapper";
import Button from "/components/presentationals/GenericButton";
import { isMailValid } from "/helpers/ValidationHelper";

const styles = {
	textInputStyle: {
		backgroundColor: "#12194d",
		color: "white",
		flex: 1,
		input: {
			height: 25,
			placeholderTextColor: "white",
			fontSize: 20,
			fontFamily: "brother-1816-bold",
			textAlign: "center"
		}
	},
	hiddenKeyboardComponentsStyle: {
		rootWrapper: { justifyContent: "center" },
		title: { fontSize: 27 },
		description: { fontSize: 25 }
	},
	showingKeyboardComponentsStyle: {
		rootWrapper: { justifyContent: "flex-start" },
		title: { fontSize: 20 },
		description: { fontSize: 18 }
	},
	landscapeStyle: {
		title: { fontSize: 18 },
		description: { fontSize: 16 }
	}
};

RkTheme.setType("RkTextInput", "referralInputText", styles.textInputStyle);

@connect(state => ({
	userId: state.userData.userId,
	orientation: state.currentOrientation
}))
export default class Referrals extends React.Component {
	state = {
		spinnerVisible: false,
		error: false,
		message: null,
		componentsStyle: styles.hiddenKeyboardComponentsStyle,
		mail: null,
		landscapeStyle: {}
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.orientation == "landscape") {
			return { landscapeStyle: styles.landscapeStyle };
		}
		if (nextProps.orientation == "portrait") {
			return { landscapeStyle: {} };
		}

		return prevState;
	}

	componentDidMount() {
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
			componentsStyle: styles.showingKeyboardComponentsStyle
		});
	};

	_keyboardDidHide = () => {
		this.setState({ componentsStyle: styles.hiddenKeyboardComponentsStyle });
	};

	onFocus = () => {
		this.setState({ message: null });
	};

	render() {
		return (
			<RootWrapper style={this.state.componentsStyle.rootWrapper}>
				{(this.state.componentsStyle == styles.hiddenKeyboardComponentsStyle ||
					this.props.orientation == "portrait") && (
					<View style={{ flex: -1 }}>
						<GenericText
							style={[
								{
									fontFamily: "brother-1816-bold",
									flex: -1,
									paddingBottom: 10
								},
								this.state.componentsStyle.title,
								this.state.landscapeStyle.title
							]}>
							REFERIDOS
						</GenericText>
						<GenericText
							style={[
								{ flex: -1, paddingBottom: 10 },
								this.state.componentsStyle.description,
								this.state.landscapeStyle.description
							]}>
							Invitá a quien quieras y disfruten ambos de beneficios exclusivos
						</GenericText>
					</View>
				)}
				<View style={{ flexDirection: "row", marginBottom: 15 }}>
					<RkTextInput
						rkType="outline referralInputText"
						placeholder="INGRESÁ MAIL"
						autoFocus
						onChangeText={pMail => this.setState({ mail: pMail })}
						onSubmitEditing={this.sendEmail}
						keyboardType="email-address"
						returnKeyType="send"
						autoCapitalize="none"
						autoCorrect={false}
						value={this.state.mail}
						onFocus={this.onFocus}
					/>
				</View>
				{this.state.message && (
					<GenericText
						style={{
							fontSize: 17,
							flex: -1,
							paddingTop: 10
						}}
						error={this.state.error}>
						{this.state.message}
					</GenericText>
				)}
				<LoadingSpinner visible={this.state.spinnerVisible} />
			</RootWrapper>
		);
	}

	sendEmail = () => {
		Keyboard.dismiss();
		if (!isMailValid(this.state.mail)) {
			this.setState({ message: Messages.INVALID_MAIL, error: true });
			return;
		}
		this.setState({ message: null, spinnerVisible: true });
		if (this.props.userId !== null) {
			sendReferral(this.props.userId, this.state.mail)
				.then(response => {
					this.setState({
						message: `Listo! ${
							this.state.mail
						} comenzará a recibir nuestras promociones! `,
						error: false,
						mail: null,
						spinnerVisible: false
					});
				})
				.catch(message => {
					this.setState({
						message,
						error: true,
						spinnerVisible: false
					});
				});
		} else {
			this.setState({
				message: Messages.SYSTEM_READ_ERROR,
				error: true,
				spinnerVisible: false
			});
		}
	};
}
