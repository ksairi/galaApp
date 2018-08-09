import React from "react";
import { connect } from "react-redux";
import { View, KeyboardAvoidingView } from "react-native";
import {
	GiftedChat,
	Composer,
	Time,
	Day,
	Bubble,
	InputToolbar,
	Send
} from "react-native-gifted-chat";
import RootWrapper from "/components/presentationals/RootWrapper";
import { ActionsCreators } from "/redux/actions/";
import { MaterialIcons } from "@expo/vector-icons";
import { sendMessages } from "/helpers/MessagesHelper";
import LoadingSpinner from "/components/presentationals/LoadingSpinner";

const styles = {
	textInputStyle: {
		fontSize: 21,
		color: "white",
		fontFamily: "lato-regular"
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
	bubbleWrapperStyle: {
		left: {
			backgroundColor: "#2f396c",
			paddingTop: 8
		},
		right: {
			backgroundColor: "#2f396c",
			paddingTop: 8,
			opacity: 0.2
		}
	},
	bubbleWrapperStyleSent: {
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
	deviceId: state.deviceId
}))
export default class Messages extends React.Component {
	componentWillMount() {
		this.props.dispatch(
			ActionsCreators.addMessages([
				{
					_id: Math.random() * 1000000,
					text: "Hello developer",
					createdAt: new Date(),
					user: {}
				}
			])
		);
	}

	async onSend(messages = []) {
		this.props.dispatch(ActionsCreators.addMessages(messages));
		const sentMessages = await sendMessages(
			this.props.userData.userId,
			this.props.deviceId,
			messages
		);
		if (sentMessages) {
			this.setSentMessages(sentMessages);
		}
	}

	setSentMessages = sentMessages => {
		this.props.dispatch(ActionsCreators.setSentMessages(sentMessages));
	};

	renderComposer = props => (
		<Composer {...props} textInputStyle={styles.textInputStyle} />
	);

	renderTimeFormat = props => <Time {...props} timeFormat="H:mm" />;

	renderDay = props => <Day {...props} dateFormat="D/M/YY" />;

	renderBubble = props => {
		var currentMessageBubbleStyle = styles.bubbleWrapperStyle;
		if (props.currentMessage.serverTime) {
			currentMessageBubbleStyle = styles.bubbleWrapperStyleSent;
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
			containerStyle={{ backgroundColor: "#12194d", borderTopWidth: 0 }}
		/>
	);
	renderSend = props => (
		<Send {...props}>
			<View style={{ marginBottom: 10, marginRight: 5 }}>
				<MaterialIcons name="send" color="white" size={25} />
			</View>
		</Send>
	);

	renderLoading = () => <LoadingSpinner visible={true} message={"Cargando"} />;

	render() {
		return (
			<RootWrapper style={{ paddingLeft: 0, paddingRight: 0 }}>
				<GiftedChat
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
				/>
				<KeyboardAvoidingView
					behavior={"padding"}
					keyboardVerticalOffset={120}
				/>
			</RootWrapper>
		);
	}
}
