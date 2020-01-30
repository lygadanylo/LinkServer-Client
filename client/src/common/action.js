import axios from 'axios';
import fileDownload from 'js-file-download';

export const LoginStatus = (data) => ({
	type: 'LOGIN_STATUS',
	payload: data
});

export const Notification = (data) => ({
	type: 'NOTIFICATION',
	payload: data
});

export const AllUsers = (data) => ({
	type: 'ALL_USERS',
	payload: data
});

export const sendLoginData = ({ data, props }) => (dispatch) => {
	axios({
		method: 'POST',
		url: 'http://172.24.211.7:8080/api/login',
		data: data
	})
		.then((response) => {
			if (response.data.token) {
				localStorage.setItem('token', response.data.token);
				return props.history.push('/api/download');
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

export const sendRegisterData = (data) => (dispatch) => {
	axios({
		method: 'POST',
		url: 'http://172.24.211.7:8080/api/register',
		data: data
	})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const loadFiles = (data) => () => {
	axios({
		method: 'POST',
		url: 'http://172.24.211.7:8080/api/download',
		data: data
	})
		.then((response) => {
			fileDownload(response.data, `LinkServerLogs_${data.sessionId}.log`);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const featchUsers = () => (dispatch) => {
	axios({
		method: 'GET',
		url: 'http://172.24.211.7:8080/api/users'
	})
		.then((response) => {
			dispatch(AllUsers(response.data.users));
		})
		.catch((error) => {
			console.log(error);
		});
};

export const deletUser = (data) => (dispatch) => {
	axios({
		method: 'POST',
		url: 'http://172.24.211.7:8080/api/delite',
		data: data
	})
		.then((response) => {
			dispatch(AllUsers(response.data.users));
		})
		.catch((error) => {
			console.log(error);
		});
};
