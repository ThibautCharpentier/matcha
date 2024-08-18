const { checkToken } = require('./checktoken')
const { checkData } = require('./checkdata')

const handleWebSocketMessage = async (ws, message) => {
	message = message.toString();
    switch (message)
	{
        case 'TOKEN':
            await checkToken(ws);
            break ;
		case 'DATA':
			await checkData(ws);
			break ;
        default:
            console.log('Unknown message:', message);
    }
};

module.exports = { handleWebSocketMessage };
