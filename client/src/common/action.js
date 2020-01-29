import axios from 'axios';

export const LoginStatus = (data) => ({
	type: 'LOGIN_STATUS',
	payload: data
});

export const Notification = (data) => ({
	type: 'NOTIFICATION',
	payload: data
});

export const sendLoginData = ({ data, props }) => (dispatch) => {
	axios({
		method: 'POST',
		url: 'http://172.24.211.94:8080/api/login',
		data: data
	})
		.then((response) => {
			if (response.data.token) {
				localStorage.setItem('token', response.data.token);
				return props.history.push('/api/donwload');
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

export const sendRegisterData = (data) => (dispatch) => {
	axios({
		method: 'POST',
		url: 'http://172.24.211.94:8080/api/register',
		data: data
	})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});
};
