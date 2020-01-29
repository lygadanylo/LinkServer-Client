import express from 'express';
import { HOST, PORT, CONNECTION } from './variables';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

CONNECTION.connect((error) => {
	if (error) {
		console.log(error);
	}
	console.log('Connection with DB created.');
	app.listen(PORT, HOST, (error) => {
		if (error) {
			console.log(error);
		}
		console.log(`Server listen on ${HOST}:${PORT}`);
	});
});
