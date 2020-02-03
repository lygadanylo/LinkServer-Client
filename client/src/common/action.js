import axios from 'axios';
import fileDownload from 'js-file-download';
import { HOST, PORT } from '../variables';

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
		url: `http://${HOST}:${PORT}/api/login`,
		data: data
	})
		.then((response) => {
			if (response.data.token) {
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('userClass', response.data.userClass);
				return props.history.push('/api/download');
			}
		})
		.catch((error) => {
			dispatch(Notification(error.response.data.msg));
			setTimeout(() => {
				dispatch(Notification(false));
			}, 3000);
		});
};

export const sendRegisterData = (data) => (dispatch) => {
	axios({
		method: 'POST',
		url: `http://${HOST}:${PORT}/api/register`,
		data: data
	})
		.then((response) => {
			dispatch(AllUsers(response.data.users));
		})
		.catch((error) => {
			console.log(error);
		});
};

export const loadFiles = (data) => () => {
	const token = localStorage.getItem('token');
	axios({
		method: 'POST',
		url: `http://${HOST}:${PORT}/api/download`,
		data: { data, token }
	})
		.then((response) => {
			fileDownload(response.data, `LinkServerLogs_${data.sessionId}.log`);
		})
		.catch((error) => {
			localStorage.clear();
			return data.props.history.push('/');
		});
};

export const featchUsers = () => (dispatch) => {
	axios({
		method: 'GET',
		url: `http://${HOST}:${PORT}/api/users`
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
		url: `http://${HOST}:${PORT}/api/delite`,
		data: data
	})
		.then((response) => {
			dispatch(AllUsers(response.data.users));
		})
		.catch((error) => {
			console.log(error);
		});
};

export const LogOut = ({ token, props }) => (dispatch) => {
	axios({
		method: 'POST',
		url: `http://${HOST}:${PORT}/api/logout`,
		data: { token }
	})
		.then(() => {
			localStorage.clear();
			return props.history.push('/');
		})
		.catch((error) => {
			console.log(error);
		});
};
