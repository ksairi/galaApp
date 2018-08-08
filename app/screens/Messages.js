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

@connect(state => ({
	messages: state.messages,
	userData: state.userData
}))
export default class Messages extends React.Component {
	state = {
		messageText: null
	};
	componentWillMount() {
		this.props.dispatch(
			ActionsCreators.addMessage([
				{
					_id: Math.random() * 1000000,
					text: "Hello developer",
					createdAt: new Date(),
					user: {}
				}
			])
		);
	}

	onSend(messages = []) {
		this.props.dispatch(ActionsCreators.addMessage(messages));
	}

	renderComposer = props => (
		<Composer
			{...props}
			textInputStyle={{
				fontSize: 21,
				color: "white",
				fontFamily: "lato-regular"
			}}
		/>
	);

	renderTimeFormat = props => <Time {...props} timeFormat="H:mm" />;

	renderDay = props => <Day {...props} dateFormat="D/M/YY" />;

	renderBubble = props => (
		<Bubble
			{...props}
			textStyle={{
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
			}}
			wrapperStyle={{
				left: {
					backgroundColor: "#2f396c",
					paddingTop: 8
				},
				right: {
					backgroundColor: "#282f59",
					paddingTop: 8
				}
			}}
			timeProps={{
				style: {
					fontSize: 26
				}
			}}
		/>
	);
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
				/>
				<KeyboardAvoidingView
					behavior={"padding"}
					keyboardVerticalOffset={120}
				/>
			</RootWrapper>
		);
	}
}
