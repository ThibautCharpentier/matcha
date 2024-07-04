const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./db/db');
const authRouter = require('./routes/auth')

dotenv.config();

const app = express();
const back_port = process.env.BACK_PORT;
const front_port = process.env.FRONT_PORT;
const url1 = process.env.LOCAL_IP;
const url2 = process.env.LOCAL_IP2;
const url3 = process.env.HOST_IP;

app.use(cors({
	origin: [`http://${url1}:${front_port}`, `http://${url2}:${front_port}`, `http://${url3}:${front_port}`],
	methods: ['GET', 'POST'],
	credentials: true
}));
app.use(express.json());

app.use('/auth', authRouter);

db.createTables().catch(err => {
	console.log('Error creating tables: ', err);
	exitServer();
});

const server = app.listen(back_port, '0.0.0.0', () => {
	console.log(`Server is running on http://${url1}:${back_port}, http://${url2}:${back_port} and http://${url3}:${back_port}`);
});

const exitServer = () => {
	console.log('Shutting down server');
	server.close(async () => {
		await db.closePool();
		process.exit(1);
	})
}
