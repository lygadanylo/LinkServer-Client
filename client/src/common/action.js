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

export const sendLoginData = ({ data, props }) => (dispatch) => {
	axios({
		method: 'POST',
		url: 'http://172.24.211.94:8080/api/login',
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

export const loadFiles = (session) => () => {
	axios({
		method: 'GET',
		url: 'http://172.24.211.7:8080/api/download'
	})
		.then((response) => {
			fileDownload(response.data, `${session}.txt`);
		})
		.catch((error) => {
			console.log(error);
		});
};

// export const downloadFile = (data) => {
// 	fetch('http://localhost:3000/api/download').then((response) => {
// 		response.blob().then((blob) => {
// 			let url = window.URL.createObjectURL(blob);
// 			let a = document.createElement('a');
// 			a.href = url;
// 			a.download = data;
// 			a.click();
// 		});
// 	});
// };
