const { pool } = require('./db');

const getNotifications = async (id) => {
	const client = await pool.connect();
	let query = `
		SELECT
			public.notification.id AS id,
			public.users.id AS id_user,
			public.users.firstname AS firstname,
			public.users.lastname AS lastname,
			public.users.picture_profile AS picture_profile,
			action,
			public.notification.verified AS verified,
			created
		FROM
			public.notification
		JOIN
			public.users ON public.notification.from_id = public.users.id
		WHERE
			user_id = $1
			AND created >= CURRENT_DATE - INTERVAL '1 month'
			AND NOT EXISTS
				(
					SELECT 1
					FROM public.interaction
					WHERE
						(public.interaction.user_id = $1 AND public.interaction.target = public.notification.from_id AND public.interaction.action = 'block')
						OR
						(public.interaction.user_id = public.notification.from_id AND public.interaction.target = $1 AND public.interaction.action = 'block')
				)
		ORDER BY
			created DESC`
	const res = await client.query(query, [id]);
	client.release();
	if (res.rows.length == 0)
		return [];
	return (res.rows)
}

const getNotification = async (from_id, user_id, action) => {
	const client = await pool.connect()
	const res = await client.query(`SELECT * FROM public.notification WHERE user_id = $1 AND from_id = $2 AND action = $3`, [user_id, from_id, action])
	client.release();
	if (res.rows.length == 0)
		return (false)
	return (true)
}

const addNotif = async (from_id, user_id, action) => {
	const client = await pool.connect()
	const res = await client.query(`SELECT * FROM public.interaction WHERE user_id = $1 AND target = $2 AND (action = 'block' OR action = 'unlike')`, [user_id, from_id])
	client.release();
	if (res.rows.length != 0)
		return ;
	const client2 = await pool.connect()
	const notif = await getNotification(from_id, user_id, action)
	if (!notif)
		await client2.query(`INSERT INTO public.notification (user_id, from_id, action) VALUES ($1, $2, $3)`, [user_id, from_id, action]);
	client2.release();
}

const verifiedNotifs = async (id) => {
	const client = await pool.connect();
	await client.query(`UPDATE public.notification SET verified = true WHERE user_id = $1`, [id]);
	client.release();
}

const deleteNotif = async (id) => {
	const client = await pool.connect();
	await client.query(`DELETE FROM public.notification WHERE id = $1`, [id]);
	client.release();
}

const deleteAllNotifs = async (user_id, from_id) => {
	const client = await pool.connect()
	await client.query(`DELETE FROM public.notification WHERE user_id = $1 AND from_id = $2`, [user_id, from_id])
}

module.exports = { getNotifications, addNotif, verifiedNotifs, deleteNotif, deleteAllNotifs }
