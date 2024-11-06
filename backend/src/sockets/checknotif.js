const notif = require('../db/notifications');

const firstSelect = async (ws) => {
	try
	{
		let res_query = await notif.getNotifications(ws.user_id);
		if (!res_query)
			ws.close(4001);
		ws.notif = res_query
	}
	catch (err)
	{
		console.log(err);
		ws.close(4001);
	}
}

const checkNewNotif = async (ws) => {
	let new_notif = false
	
	try
	{
		let res_query = await notif.getNotifications(ws.user_id);
		if (!res_query)
			ws.close(4001);
		if (res_query.length != ws.notif.length)
		{
			ws.notif = res_query
			new_notif = true
		}
		else {
			for (let i = 0; i < res_query.length; i++)
			{
				if (ws.notif[i].id != res_query[i].id)
				{
					new_notif = true
					ws.notif = res_query
				}
			}
		}
		if (new_notif == true)
			ws.send(JSON.stringify(ws.notif));
	}
	catch (err)
	{
		console.log(err);
		ws.close(4001);
	}
}

const checkNotif = async (ws) => {
	if (ws.notif == null)
	{
		ws.notif = [];
		await firstSelect(ws);
		ws.send(JSON.stringify(ws.notif));
	}
	else
		await checkNewNotif(ws);
}

module.exports = { checkNotif };
