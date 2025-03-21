const user = require('../db/user');

const firstSelect = async (ws) => {
	try {
		let res_query = await user.getData(ws.user_id);
		if (!res_query)
			ws.close(4001);
		for (let item in res_query)
			ws.data[item] = res_query[item];
		ws.data["interest"] = [];
		res_query = await user.getNameInterestsById(ws.user_id);
		for (let i in res_query)
			ws.data["interest"][i] = res_query[i];
	}
	catch (err) {
		console.log(err);
		ws.close(4001);
	}
}

const checkNewData = async (ws) => {
	let new_data = false
	try {
		let res_query = await user.getData(ws.user_id);
		if (!res_query)
			ws.close(4001);
		for (let item in res_query) {
			if (ws.data[item] != res_query[item]) {
				new_data = true;
				ws.data[item] = res_query[item];
			}
		}
		res_query = await user.getNameInterestsById(ws.user_id);
		for (let i in res_query) {
			if (ws.data["interest"][i] != res_query[i]) {
				new_data = true;
				ws.data["interest"][i] = res_query[i];
			}
		}
		if (new_data == true)
			ws.send(JSON.stringify(ws.data));
	}
	catch (err) {
		console.log(err);
		ws.close(4001);
	}
}

const checkData = async (ws) => {
	if (ws.data == null) {
		ws.data = {};
		await firstSelect(ws);
		ws.send(JSON.stringify(ws.data));
	}
	else
		await checkNewData(ws);
}

module.exports = { checkData };
