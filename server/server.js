import express from 'express';
import { HOST, PORT } from './variables';

const app = express();

app.listen(PORT, HOST, (error) => {
	if (error) {
		console.log(error);
	}
	console.log(`Server listen on ${HOST}:${PORT}`);
});
