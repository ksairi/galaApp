import React from "react";
import { Keyboard, KeyboardAvoidingView, View } from "react-native";
import { connect } from "react-redux";
import { RkTextInput, RkTheme } from "react-native-ui-kitten";
import GenericText from "/components/presentationals/GenericText";
import LoadingSpinner from "/components/presentationals/LoadingSpinner";
import { Messages, Labels } from "/config/settings";
import { sendReferral } from "/helpers/ApiHelper";
import RootWrapper from "/components/presentationals/RootWrapper";
import Button from "/components/presentationals/GenericButton";

const styles = {
	textInputStyle: {
		backgroundColor: "#12194d",
		color: "white",
		flex: 1,
		input: {
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
	}
};

RkTheme.setType("RkTextInput", "referralInputText", styles.textInputStyle);

@connect(state => ({ userId: state.userData.userId }))
export default class Referrals extends React.Component {
	state = {
		spinnerVisible: false,
		error: false,
		message: "",
		componentsStyle: styles.hiddenKeyboardComponentsStyle
	};
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
			message: "",
			componentsStyle: styles.showingKeyboardComponentsStyle
		});
	};

	_keyboardDidHide = () => {
		this.setState({ componentsStyle: styles.hiddenKeyboardComponentsStyle });
	};

	render() {
		return (
			<RootWrapper style={this.state.componentsStyle.rootWrapper}>
				<KeyboardAvoidingView>
					<GenericText
						style={[
							{
								fontFamily: "brother-1816-bold",
								flex: -1,
								paddingBottom: 10
							},
							this.state.componentsStyle.title
						]}>
						REFERIDOS
					</GenericText>
					<GenericText
						style={[
							{ flex: -1, paddingBottom: 10 },
							this.state.componentsStyle.description
						]}>
						Invitá a quien quieras y disfruten ambos de beneficios exclusivos
					</GenericText>
					<View style={{ flexDirection: "row", marginBottom: 30 }}>
						<RkTextInput
							rkType="outline referralInputText"
							placeholder="INGRESÁ MAIL"
							autoFocus
							onChangeText={pMail => (this.mail = pMail)}
							onSubmitEditing={this.sendEmail}
							keyboardType="email-address"
							returnKeyType="send"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>
					<View style={{ flexDirection: "row" }}>
						<Button
							text="ENVIAR"
							onPress={this.sendEmail}
							style={{ flex: 1 }}
							contentStyle={{
								fontFamily: "brother-1816-bold"
							}}
						/>
					</View>
					<GenericText error={this.state.error}>
						{this.state.message}
					</GenericText>
					<LoadingSpinner visible={this.state.spinnerVisible} />
				</KeyboardAvoidingView>
			</RootWrapper>
		);
	}

	sendEmail = () => {
		Keyboard.dismiss();
		if (!this.mail) {
			this.setState({ message: Messages.INVALID_EMAIL, error: true });
			return;
		}
		this.setState({ message: "", spinnerVisible: true });
		if (this.props.userId !== null) {
			sendReferral(this.props.userId, this.mail)
				.then(response => {
					this.setState({ spinnerVisible: false });
					if (response[ServerProtocol.statusField] == ServerProtocol.OK) {
						this.setState({
							message: `Listo! ${
								this.mail
							} comenzará a recibir nuestras promociones! `,
							error: false
						});
					} else {
						this.setState({
							message: response[ServerProtocol.messageField],
							error: true
						});
					}
				})
				.catch(message => {
					this.setState((prevState, props) => ({
						message,
						error: true,
						spinnerVisible: false
					}));
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
