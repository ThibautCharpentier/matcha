const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const checkToken = async (ws) => {
	try
	{
		const decoded = jwt.verify(ws.access_token, process.env.SECRET_TOKEN_KEY);
		const expiration = new Date(decoded.exp * 1000);
		if ((expiration - new Date()) <= 60000)
			await ws.send('Refresh');
	}
	catch (err)
	{
		console.log(err);
		await ws.send('Refresh');
	}
}

module.exports = { checkToken };
