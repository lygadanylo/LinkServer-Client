export default (state = {}, action) => {
	const payload = action.payload;
	console.log(action);
	switch (action.type) {
		case 'NOTIFICATION': {
			return { ...state, notification: payload };
		}
		case 'ALL_USERS': {
			return { ...state, users: payload };
		}
		default: {
			return { ...state, payload };
		}
	}
};
