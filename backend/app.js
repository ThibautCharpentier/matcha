const express = require('express');
const dotenv = require('dotenv');
const db = require('./db/db');

dotenv.config();

const app = express();
const port =  process.env.BACK_PORT;

app.get('/', (req, res) => {
	res.send('Hello World!');
});

db.createTables().catch(err => {
	console.log('Error creating tables: ', err);
	exitServer();
});

const server = app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

const exitServer = () => {
	console.log('Shutting down server');
	server.close(async () => {
		await db.closePool();
		process.exit(1);
	})
}
