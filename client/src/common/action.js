import axios from 'axios';
import passwordHash from 'password-hash';

export const LoginStatus = (data) => ({
	type: 'LOGIN_STATUS',
	payload: data
});

export const Notification = (data) => ({
	type: 'NOTIFICATION',
	payload: data
});

export const sendLoginData = (data) => (dispatch) => {
	const { password, name } = data;
	const hashP = passwordHash.generate(password);
	const User = { password: hashP, name: name };
	axios({
		method: 'POST',
		url: 'http://172.24.211.94:8080/api/login',
		data: User
	})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});
};
