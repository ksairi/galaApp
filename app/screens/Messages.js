import React from "react";
import {
	View,
	KeyboardAvoidingView,
	AppState,
	Keyboard,
	Platform,
	TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import {
	GiftedChat,
	Composer,
	Time,
	Day,
	Bubble,
	InputToolbar,
	Send
} from "react-native-gifted-chat";
import Dialog from "react-native-dialog";
import RootWrapper from "/components/presentationals/RootWrapper";
import { ActionsCreators } from "/redux/actions";
import { MaterialIcons } from "@expo/vector-icons";
import { sendMessages } from "/helpers/MessagesHelper";
import LoadingSpinner from "/components/presentationals/LoadingSpinner";
import {
	getRealTimeMessages,
	setRealTimeMessagesSaved
} from "/helpers/ApiHelper";
import { saveMessagesToDevice } from "/helpers/StoreHelper";
import AnalyticsHelper from "/helpers/AnalyticsHelper";
import { Screens } from "config/settings";
const styles = {
	textInputStyle: {
		fontSize: 21,
		color: "white",
		fontFamily: "lato-regular",
		lineHeight: 26
	},
	bubbleTextStyle: {
		right: {
			color: "white",
			fontFamily: "lato-regular",
			fontSize: 21,
			lineHeight: 27
		},
		left: {
			color: "white",
			fontFamily: "lato-regular",
			fontSize: 21,
			lineHeight: 27
		}
	},
	bubbleWrapperStyleMessageNotSent: {
		right: {
			backgroundColor: "#2f396c",
			paddingTop: 8,
			opacity: 0.2
		}
	},
	bubbleWrapperStyleMessageSynched: {
		left: {
			backgroundColor: "#2f396c",
			paddingTop: 8
		},
		right: {
			backgroundColor: "#2f396c",
			paddingTop: 8,
			opacity: 1
		}
	}
};

@connect(state => ({
	messages: state.messages,
	userData: state.userData,
	hasShownUnsentMessagesDialog: state.hasShownUnsentMessagesDialog,
	newMessagesCount: state.newMessagesCount,
	loginSynchedDataParameters: state.loginSynchedDataParameters
}))
export default class Messages extends React.Component {
	state = {
		showFirstUnsentMessageDialog: false,
		resendMessage: null,
		appState: AppState.currentState
	};

	static intervalId;

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.newMessagesCount) {
			return { hasNewMessages: true };
		}
		return prevState;
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.newMessagesCount > 0) {
			this.props.dispatch(ActionsCreators.setNewMessagesCount(null));
		}
	}

	componentDidMount() {
		this._mounted = true;
		AnalyticsHelper.setPageHit(Screens.Messages);
		AppState.addEventListener("change", this._handleAppStateChange);
		this.keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			this._keyboardDidShow
		);
		if (this.props.newMessagesCount > 0) {
			this.props.dispatch(ActionsCreators.setNewMessagesCount(null));
		}
		this.startPullingMessages();
	}

	_keyboardDidShow = e => {
		if (this._mounted) {
			this.setState({ keyboardHeight: e.endCoordinates.height });
		}
	};

	startPullingMessages = () => {
		this.doGetRealTimeMessages();
		Messages.intervalId = setInterval(() => this.doGetRealTimeMessages(), 5000);
	};

	doGetRealTimeMessages = (hasClientLeftChat = false) => {
		getRealTimeMessages({
			userId: this.props.userData.userId,
			lastSynchedMessageIndex:
				this.props.messages && this.props.messages.length > 0
					? this.props.messages[0].index
					: null,
			hasClientLeftChat
		})
			.then(messages => {
				if (messages && messages.length > 0) {
					saveMessagesToDevice(messages, null, this.props.dispatch);
					setRealTimeMessagesSaved({
						userId: this.props.userData.userId,
						lastMessageIndex: messages[messages.length - 1].index
					});
				}
			})
			.catch(() => {});
	};

	componentWillUnmount() {
		this._mounted = false;
		AppState.removeEventListener("change", this._handleAppStateChange);
		clearInterval(Messages.intervalId);
		this.doGetRealTimeMessages(true);
	}

	_handleAppStateChange = nextAppState => {
		if (
			this.state.appState.match(/inactive|background/) &&
			nextAppState === "active"
		) {
			this.startPullingMessages();
			if (this.props.newMessagesCount > 0) {
				this.props.dispatch(ActionsCreators.setNewMessagesCount(null));
			}
		}
		if (
			this.state.appState === "active" &&
			(nextAppState === "inactive" || nextAppState === "background")
		) {
			clearInterval(Messages.intervalId);
			this.doGetRealTimeMessages(true);
		}
		this.setState({ appState: nextAppState });
	};

	onSend = async (messages = []) => {
		const unSentMsgs = messages.map(message => ({
			...message,
			createdAt: null
		}));
		this.props.dispatch(ActionsCreators.setMessages(unSentMsgs));
		this.doSendMessages(unSentMsgs);
	};

	doSendMessages = async messages => {
		try {
			await sendMessages(
				this.props.userData.userId,
				messages,
				this.props.dispatch
			);
			setRealTimeMessagesSaved({
				userId: this.props.userData.userId,
				lastMessageIndex: this.props.messages[0].index
			});
		} catch (err) {
			this.setState({ showFirstUnsentMessageDialog: true });
		}
	};

	renderComposer = props => (
		<Composer {...props} textInputStyle={styles.textInputStyle} />
	);

	renderTimeFormat = props => <Time {...props} timeFormat="H:mm" />;

	renderDay = props => <Day {...props} dateFormat="D/M/YY" />;

	renderBubble = props => {
		var currentMessageBubbleStyle = styles.bubbleWrapperStyleMessageNotSent;
		if (props.currentMessage.serverTime) {
			currentMessageBubbleStyle = styles.bubbleWrapperStyleMessageSynched;
		}
		return (
			<Bubble
				{...props}
				textStyle={styles.bubbleTextStyle}
				wrapperStyle={currentMessageBubbleStyle}
			/>
		);
	};

	renderInputToolbar = props => (
		<InputToolbar
			{...props}
			containerStyle={{
				backgroundColor: "#12194d",
				borderTopWidth: 0
			}}
		/>
	);
	renderSend = props => (
		<Send {...props}>
			<View style={{ marginBottom: 10, marginRight: 5 }}>
				<MaterialIcons name="send" color="white" size={25} />
			</View>
		</Send>
	);

	renderLoading = () => (
		<LoadingSpinner visible={true} message={"Cargando los mensajes!"} />
	);

	showUnsentMessageDialog = () => {
		if (!this.props.hasShownUnsentMessagesDialog) {
			return (
				<Dialog.Container visible={this.state.showFirstUnsentMessageDialog}>
					<Dialog.Title>Mensaje no enviado</Dialog.Title>
					<Dialog.Description>
						Seleccioná el mensaje para reintentar
					</Dialog.Description>
					<Dialog.Button
						label="OK"
						onPress={() => {
							this.props.dispatch(
								ActionsCreators.setHasShownUnsentMessagesDialog()
							);
							this.setState({ showFirstUnsentMessageDialog: false });
						}}
					/>
				</Dialog.Container>
			);
		}
	};

	onPressBubble = (context, message) => {
		if (!message.serverTime) {
			const messageCopy = { ...message };
			delete messageCopy.previousMessage;
			delete messageCopy.nextMessage;
			delete messageCopy.hash;
			this.setState({ resendMessage: messageCopy });
		}
	};
	showResendDialog = () => (
		<Dialog.Container visible={this.state.resendMessage != null}>
			<Dialog.Title>Mensaje no enviado</Dialog.Title>
			<Dialog.Button
				label="Enviar"
				onPress={() => {
					this.doSendMessages([this.state.resendMessage]);
					this.setState({ resendMessage: null });
				}}
			/>
			<Dialog.Button
				label="Borrar"
				onPress={() => {
					this.props.dispatch(
						ActionsCreators.deleteMessage(this.state.resendMessage)
					);
					this.setState({ resendMessage: null });
				}}
			/>
			<Dialog.Button
				label="Cancelar"
				onPress={() => this.setState({ resendMessage: null })}
			/>
		</Dialog.Container>
	);

	hideKeyboard = () => {
		Keyboard.dismiss();
	};

	render() {
		return (
			<TouchableWithoutFeedback onPress={this.hideKeyboard}>
				<View style={{ flex: 1 }}>
					<RootWrapper style={{ padding: 0 }}>
						<GiftedChat
							textInputProps={{ autoFocus: true }}
							messages={this.props.messages}
							onSend={messages => this.onSend(messages)}
							user={{
								_id: this.props.userData.userId
							}}
							isAnimated={true}
							renderComposer={this.renderComposer}
							renderTime={this.renderTimeFormat}
							renderDay={this.renderDay}
							renderBubble={this.renderBubble}
							renderInputToolbar={this.renderInputToolbar}
							renderSend={this.renderSend}
							placeholder="Escribí tu mensaje"
							placeholderTextColor="white"
							renderLoading={this.renderLoading}
							onLongPress={this.onPressBubble}
						/>
						{Platform.OS != "ios" && (
							<KeyboardAvoidingView
								behavior={"padding"}
								keyboardVerticalOffset={
									this.state.keyboardHeight
										? this.state.keyboardHeight - 150
										: 100
								}
							/>
						)}
						{this.showUnsentMessageDialog()}
						{this.showResendDialog()}
					</RootWrapper>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}
