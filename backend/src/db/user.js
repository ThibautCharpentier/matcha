const bcrypt = require('bcrypt');
const { pool } = require('./db');

const insert = async (username, firstname, lastname, email, password) => {
	const client = await pool.connect();
	const values = [username, firstname, lastname, email, password]
	await client.query(`INSERT INTO public.user (username, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5)`, values);
	client.release();
}

const validateEmail = async (id) => {
	const client = await pool.connect();
	await client.query(`UPDATE public.user SET verified = true WHERE id = $1`, [id]);
	client.release();
}

const changePassword = async (id, password) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	const client = await pool.connect();
	await client.query(`UPDATE public.user SET password = $1 WHERE id = $2`, [hashedPassword, id]);
	client.release();
}

const connect = async (id, connected) => {
	const client = await pool.connect();
	if (connected)
		await client.query(`UPDATE public.user SET status = 'online' WHERE id = $1`, [id]);
	else
		await client.query(`UPDATE public.user SET status = 'offline', last_connection = CURRENT_TIMESTAMP WHERE id = $1`, [id]);
	client.release();
}

const selectByUsername = async (username) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM public.user WHERE username = $1`, [username]);
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0];
}

const selectByEmail = async (email) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM public.user WHERE email = $1`, [email]);
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0];
}

const selectById = async (id) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM public.user WHERE id = $1`, [id]);
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0];
}

module.exports = { insert, validateEmail, changePassword, connect, selectByUsername, selectByEmail, selectById };
