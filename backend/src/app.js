const express = require('express');
const cookieParser = require('cookie-parser');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const WebSocket = require('ws');
const db = require('./db/db');
const authRouter = require('./routes/auth')
const user = require('./db/user');
const { handleWebSocketMessage } = require('./sockets/handlewebsocketmessage');

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
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouter);

db.createTables().catch(err => {
	console.log('Error creating tables: ', err);
	exitServer();
});

const server = http.createServer(app);
const websocket = new WebSocket.Server({ server: server });
server.listen(back_port, '0.0.0.0', () => {
	console.log(`Server is running on http://${url1}:${back_port}, http://${url2}:${back_port} and http://${url3}:${back_port}`);
});

websocket.on('connection', async (ws, req) => {
	const cookies = cookie.parse(req.headers.cookie);
    const accessToken = cookies.accessToken;

    if (!accessToken)
	{
		ws.close(4001);
		return ;
	}
	try
	{
		const decoded = jwt.verify(accessToken, process.env.SECRET_TOKEN_KEY);
		ws.user_id = decoded.id;
		ws.access_token = accessToken;
		const res_query = await user.selectById(ws.user_id);
		if (res_query.status == 'offline')
			await user.connect(ws.user_id, true);
	}
	catch (err)
	{
		console.log(err);
		ws.close(4001);
	}
    ws.on('message', async (message) => {
        await handleWebSocketMessage(ws, message);
    });

    ws.on('close', async (code) => {
        if (code == 4001 || code == 4002)
			return ;
		await user.connect(ws.user_id, false);
    });

    ws.on('error', async (error) => {
        console.log(error);
    });
});

const exitServer = () => {
	console.log('Shutting down server');
	server.close(async () => {
		await db.closePool();
		process.exit(1);
	})
}

module.exports = { websocket }
