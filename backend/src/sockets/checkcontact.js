const chat = require('../db/chat');

const firstSelect = async (ws) => {
	try {
		let res_query = await chat.getChats(ws.user_id);
		
		if (!res_query)
			ws.close(4001);
		ws.chat = res_query
	}
	catch (err) {
		console.log(err);
		ws.close(4001);
	}
}

const checkNewChat = async (ws) => {
	let has_to_send = false
	try {
		let res_query = await chat.getChats(ws.user_id);
		if (!res_query)
			ws.close(4001);
		if (res_query.length != ws.chat.length)
			has_to_send = true
		else {
			res_query.forEach((element) => {
				for (let i = 0; i < ws.chat.length; i++) {
					if (element.room_id == ws.chat[i].room_id) {
						break
					}
					else if (i + 1 == ws.chat.length)
						has_to_send == true
				}
			})
		}
		ws.chat = res_query;
		if (has_to_send)
			ws.send(JSON.stringify(ws.chat));
	}
	catch (err) {
		console.log(err);
		ws.close(4001);
	}
}

const checkContact = async (ws) => {
	if (ws.chat == null) {
		ws.chat = [];
		await firstSelect(ws);
		ws.send(JSON.stringify(ws.chat));
	}
	else
		await checkNewChat(ws);
}

module.exports = { checkContact };
