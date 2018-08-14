import React from "react";
import { View, KeyboardAvoidingView, AppState } from "react-native";
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
import { ActionsCreators } from "/redux/actions/";
import { MaterialIcons } from "@expo/vector-icons";
import { sendMessages } from "/helpers/MessagesHelper";
import LoadingSpinner from "/components/presentationals/LoadingSpinner";

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
	deviceId: state.deviceId,
	hasShownUnsentMessagesDialog: state.hasShownUnsentMessagesDialog,
	newMessagesCount: state.newMessagesCount
}))
export default class Messages extends React.Component {
	state = {
		showFirstUnsentMessageDialog: false,
		resendMessage: null,
		appState: AppState.currentState
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.newMessagesCount) {
			return { hasNewMessages: true };
		}
		return prevState;
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.hasNewMessages) {
			this.props.dispatch(ActionsCreators.setNewMessagesCount(null));
		}
	}

	componentDidMount() {
		AppState.addEventListener("change", this._handleAppStateChange);
		this.props.dispatch(ActionsCreators.setNewMessagesCount(null));
	}

	componentWillUnmount() {
		AppState.removeEventListener("change", this._handleAppStateChange);
	}

	_handleAppStateChange = nextAppState => {
		if (
			this.state.appState.match(/inactive|background/) &&
			nextAppState === "active"
		) {
			this.props.dispatch(ActionsCreators.setNewMessagesCount(null));
		}
		this.setState({ appState: nextAppState });
	};

	onSend = async (messages = []) => {
		var nextIndex = this.props.messages.length;
		messages.forEach(newMessage => {
			newMessage.index = nextIndex++;
		});
		this.props.dispatch(ActionsCreators.addMessages(messages));
		this.doSendMessages(messages);
	};

	doSendMessages = async messages => {
		const sentMessages = await sendMessages(
			this.props.userData.userId,
			this.props.deviceId,
			messages
		);
		if (sentMessages) {
			this.setSentMessages(sentMessages);
		} else {
			this.setState({ showFirstUnsentMessageDialog: true });
		}
	};

	setSentMessages = sentMessages => {
		this.props.dispatch(ActionsCreators.setSentMessages(sentMessages));
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

	render() {
		return (
			<RootWrapper style={{ paddingLeft: 0, paddingRight: 0 }}>
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
					renderLoading={this.renderLoading}
					onLongPress={this.onPressBubble}
				/>
				<KeyboardAvoidingView
					behavior={"padding"}
					keyboardVerticalOffset={120}
				/>
				{this.showUnsentMessageDialog()}
				{this.showResendDialog()}
			</RootWrapper>
		);
	}
}
