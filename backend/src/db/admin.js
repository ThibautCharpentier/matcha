const { pool } = require('./db');

const selectById = async (id) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM public.admin WHERE id = $1`, [id]);
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0];
}

const selectByEmail = async (email) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM public.admin WHERE email = $1`, [email]);
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0];
}

const changeCode = async (id, code) => {
	const client = await pool.connect();
	await client.query(`UPDATE public.admin SET code = $1 WHERE id = $2`, [code, id]);
	client.release();
}

module.exports = { selectById, selectByEmail, changeCode };
