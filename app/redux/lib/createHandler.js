export default handlers => {
	return function notificationHandler(data) {
		const hanlder = Object.keys(data).filter(key => key != "notificationId");
		if (handlers.hasOwnProperty(hanlder)) {
			return handlers[hanlder](data);
		} else {
			return null;
		}
	};
};
