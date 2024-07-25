const { checkToken } = require('./checktoken')

const handleWebSocketMessage = async (ws, message) => {
	message = message.toString();
    switch (message)
	{
        case 'TOKEN':
            await checkToken(ws);
            break;
        default:
            console.log('Unknown message:', message);
    }
};

module.exports = { handleWebSocketMessage };
