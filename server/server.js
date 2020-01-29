import express from 'express';
import { HOST, PORT, CONNECTION } from './variables';
import bodyParser from 'body-parser';
import apiRoute from './routs/api';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', apiRoute);

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
