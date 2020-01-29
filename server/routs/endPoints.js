import fs from 'fs';
export { CONNECTION } from '../variables';

export const login = (req, res) => {
	console.log('in');
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
