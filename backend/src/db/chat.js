const { pool } = require('./db');
const user = require('./user');

const getChats = async (id) => {
	const client = await pool.connect();
	const res = await client.query('SELECT * FROM public.chat WHERE user1 = $1 OR user2 = $1', [id]);
	client.release();
	if (res.rows.length == 0)
		return [];
	let chats = []
	for (let i = 0; i < res.rows.length; i++) {
		let target_id
		if (res.rows[i].user1 == id)
			target_id = res.rows[i].user2
		else
			target_id = res.rows[i].user1
		const res2 = await user.selectById(target_id)
		chats.push({
			room_id: res.rows[i].id,
			firstname: res2.firstname,
			lastname: res2.lastname
		})
	}
	return (chats)
}

const getChat = async (user1, user2) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM public.chat WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1)`, [user1, user2])
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0];
}

const addChat = async (user1, user2) => {
	const client = await pool.connect()
	await client.query(`INSERT INTO public.chat (user1, user2) VALUES ($1, $2)`, [user1, user2]);
	client.release();
}

const deleteChat = async (user1, user2) => {
	const client = await pool.connect()
	await client.query(`DELETE FROM public.chat WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1)`, [user1, user2]);
	client.release();
}

module.exports = { addChat, getChats, deleteChat, getChat }
