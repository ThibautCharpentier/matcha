const { pool } = require('./db');

const getNotifications = async (id) => {
	const client = await pool.connect();
	let query = `
		SELECT
			public.notification.id AS id,
			public.users.firstname AS firstname,
			public.users.lastname AS lastname,
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
		ORDER BY
			created DESC
		LIMIT 10`
	const res = await client.query(query, [id]);
	client.release();
	if (res.rows.length == 0)
		return [];
	return (res.rows)
}

const addNotif = async (from_id, user_id, action) => {
	const client = await pool.connect()
	let values = [user_id, from_id]
	const res = await client.query(`SELECT * FROM public.interaction WHERE user_id = $1 AND target = $2 AND action = 'block'`, values)
	client.release();
	if (res.rows.length != 0)
		return ;
	const client2 = await pool.connect()
	values = [user_id, from_id, action]
	await client2.query(`INSERT INTO public.notification (user_id, from_id, action) VALUES ($1, $2, $3)`, values);
	client2.release();
}

const verifiedNotifs = async (id) => {
	const client = await pool.connect();
	await client.query(`UPDATE public.notification SET verified = true WHERE user_id = $1`, [id]);
	client.release();
}

module.exports = { getNotifications, addNotif, verifiedNotifs }
