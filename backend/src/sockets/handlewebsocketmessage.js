const { checkToken } = require('./checktoken')
const { checkData } = require('./checkdata')
const { checkNotif } = require('./checknotif')
const { checkContact } = require('./checkcontact')

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
		case 'NOTIF':
			await checkNotif(ws);
			break ;
		case 'CONTACT':
			await checkContact(ws);
			break ;
        default:
            console.log('Unknown message:', message);
    }
};

module.exports = { handleWebSocketMessage };
