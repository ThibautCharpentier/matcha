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
			lastname: res2.lastname,
			picture_profil: res2.picture_profile,
			user_id: res2.id
		})
	}
	return (chats)
}

const getAllChatsAndMessagesByUserId = async (userId) => {
	const client = await pool.connect();
	
	const result = await client.query(
		`
		SELECT m.*, c.id AS chat_id, c.user1, c.user2
		FROM public.chat c
		JOIN public.message m ON c.id = m.chat
		WHERE c.user1 = $1 OR c.user2 = $1
		ORDER BY c.id, m.created ASC
		`,
		[userId]
	);

	client.release();

	if (result.rows.length == 0)
		return [];
	else
		return result.rows;
};

const addChat = async (user1, user2) => {
	const client = await pool.connect()
	let values = [user1, user2]
	const res = await client.query(`SELECT * FROM public.chat WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1)`, values)
	client.release();
	if (res.rows.length != 0)
		return ;
	const client2 = await pool.connect()
	values = [user1, user2]
	await client2.query(`INSERT INTO public.chat (user1, user2) VALUES ($1, $2)`, values);
	client2.release();
}

const deleteChat = async (user1, user2) => {
	const client = await pool.connect()
	let values = [user1, user2]
	const res = await client.query(`SELECT * FROM public.chat WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1)`, values)
	client.release();
	if (res.rows.length != 0)
		return ;
	const client2 = await pool.connect()
	values = [user1, user2]
	await client2.query(`DELETE FROM public.chat WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1)`, values);
	client2.release();
}

const addMessageInChat = async (room_id, sender_id, receiver_id, new_message) => {
	const client = await pool.connect()
	let values = [room_id, sender_id, receiver_id, new_message]
	const res = await client.query(`INSERT INTO public.message (chat, sender, receiver, message) VALUES ($1, $2, $3, $4)`, values)
	client.release();
}

const allMessagesView = async (room_id, receiver_id) => {
	const client = await pool.connect()
	const res = await client.query(`UPDATE public.message SET view = true WHERE chat = $1 AND receiver = $2`,[room_id, receiver_id]
	);
	client.release();
}

module.exports = { addChat, getChats, getAllChatsAndMessagesByUserId, deleteChat, addMessageInChat, allMessagesView }
