import React from "react";
import { connect } from "react-redux";
import { GiftedChat, Composer, Time, Day } from "react-native-gifted-chat";
import RootWrapper from "/components/presentationals/RootWrapper";
import { ActionsCreators } from "/redux/actions/";
import moment from "moment";
const styles = {
	footerContainer: {
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10
	},
	footerText: {
		fontSize: 14,
		color: "#aaa"
	},
	status: {
		textAlign: "center",
		padding: 5
	}
};

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
		<Composer {...props} placeholder="Escribí tu mensaje" />
	);

	renderTimeFormat = props => <Time {...props} timeFormat="H:mm" />;

	renderDay = props => <Day {...props} dateFormat="D/M/YY" />;

	render() {
		return (
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
			/>
		);
	}
}
