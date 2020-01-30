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

const setUser = ({ name, hashPassword, userRole }) => {
	return new Promise((resolve, reject) => {
		CONNECTION.query(
			`insert into ${TABLE} (userName, userPassword,userClass) values ('${name}', '${hashPassword}', '${userRole}')`,
			(error, data) => {
				if (error) {
					reject(error);
				}
				resolve(data);
			}
		);
	});
};

const getAllUsers = () => {
	return new Promise((resolve, reject) => {
		CONNECTION.query(`Select * from ${TABLE}`, (error, users) => {
			if (error || users.length === 0) {
				reject(error);
			}
			resolve(users);
		});
	});
};

const dropUser = ({ id }) => {
	return new Promise((resolve, reject) => {
		CONNECTION.query(`delete from ${TABLE} where id = ${id}`, (error) => {
			if (error) {
				reject(error);
			}
			resolve(true);
		});
	});
};

export const login = (req, res) => {
	const { name, password } = req.body;
	if (name !== '' && password !== '') {
		getUser(name)
			.then((response) => {
				const { userPassword, userName, userClass } = response[0];
				const hashPassword = Decrypt(userPassword);
				if (password === hashPassword) {
					const token = new TokenGenerator().generate();
					SESSION.set(token, userName);
					setInterval(() => {
						SESSION.delete(token);
					}, 15 * 60 * 1000);
					return res.status(200).json({ token, userClass });
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
	const { name, password, userRole } = req.body;
	const hashPassword = Encrypt(password);
	setUser({ name, hashPassword, userRole })
		.then(() => {
			getAllUsers().then((response) => {
				return res.status(200).json({ users: response });
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

export const download = (req, res) => {
	const { data: { sessionId }, token } = req.body;
	if (SESSION.has(token)) {
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
					if (result[1] === sessionId) {
						downloaded.push({ name: files[i] });
						res.download(logsDirectoryPath + '\\' + downloaded[0].name);
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		return res.status(500).json({ type: false, msg: 'token deleted' });
	}
};

export const featchUsers = (req, res) => {
	getAllUsers()
		.then((response) => {
			return res.status(200).json({ users: response });
		})
		.catch((error) => {
			console.log(error);
		});
};

export const deleteUser = (req, res) => {
	const { id } = req.body;
	dropUser({ id })
		.then(() => {
			getAllUsers().then((response) => {
				return res.status(200).json({ users: response });
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

export const logout = (req, res) => {
	const { token } = req.body;
	if (token) {
		SESSION.delete(token);
		return res.status(200).json({ msg: 'Logged out' });
	}
};
