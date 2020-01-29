import fs from 'fs';
import { CONNECTION, TABLE } from '../variables';
import { SESSION } from '../server';
import TokenGenerator from 'uuid-token-generator';
import Cryptr from 'cryptr';

const cryptr = new Cryptr('myTotalySecretKey');

const Encrypt = (data) => {
	const encryptePassword = cryptr.encrypt(data);
	return encryptePassword;
};

const Decrypt = (data) => {
	const decryptedPassword = cryptr.decrypt(data);
	return decryptedPassword;
};
const getUser = (name) => {
	return new Promise((resolve, reject) => {
		CONNECTION.query(`select * from ${TABLE} where userName = '${name}'`, (error, user) => {
			if (error || user.length === 0) {
				reject(error);
			}
			resolve(user);
		});
	});
};

const setUser = ({ name, hashPassword }) => {
	return new Promise((resolve, reject) => {
		CONNECTION.query(
			`insert into ${TABLE} (userName, userPassword) values ('${name}', '${hashPassword}')`,
			(error, data) => {
				if (error) {
					reject(error);
				}
				resolve(data);
			}
		);
	});
};

export const login = (req, res) => {
	const { name, password } = req.body;
	if (name !== '' && password !== '') {
		getUser(name)
			.then((response) => {
				const { userPassword, userName } = response[0];
				const hashPassword = Decrypt(userPassword);
				if (password === hashPassword) {
					const token = new TokenGenerator().generate();
					SESSION.set(userName, token);
					return res.status(200).json({ token });
				} else {
					return res.status(500).json({ msg: 'Password invalid' });
				}
			})
			.catch((error) => {
				console.log('User not found');
			});
	}
};

export const register = (req, res) => {
	const { name, password } = req.body;
	const hashPassword = Encrypt(password);
	setUser({ name, hashPassword })
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});
};

export const download = (req, res) => {
	console.log('Server!!!!');

	const logsDirectoryPath = 'D:\\LOgs';

	return new Promise((resolve, reject) => {
		fs.readdir(logsDirectoryPath, (err, files) => {
			if (err) {
				console.log(err);
				reject(err);
			}
			resolve(files);
		});
	})
		.then((files) => {
			let downloaded = [];

			for (let i in files) {
				let result = files[i].split('_');

				if (result[1] === '1579879800504') {
					downloaded.push({ name: files[i] });
					console.log(downloaded[0].name);
					res.download('D:\\LOgs\\' + downloaded[0].name);
				}
			}
		})
		.catch((err) => {
			console.log(err);
		});
};
