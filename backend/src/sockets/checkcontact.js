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
	let new_chat = []
	try {
		let res_query = await chat.getChats(ws.user_id);
		if (!res_query)
			ws.close(4001);
		res_query.forEach((element) => {
			let add_to_new_chat = true
			for (let i = 0; i < ws.chat.length; i++) {
				if (element.room_id == ws.chat[i].room_id) {
					add_to_new_chat = false
					break
				}
			}
			if (add_to_new_chat == true)
				new_chat.push(element)
		})
		ws.chat = res_query
		if (new_chat.length > 0)
			ws.send(JSON.stringify(new_chat));
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
