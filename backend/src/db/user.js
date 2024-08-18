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

const changeUsername = async (id, username) => {
	const client = await pool.connect();
	await client.query(`UPDATE public.user SET username = $1 WHERE id = $2`, [username, id]);
	client.release();
}

const changeEmail = async (id, email) => {
	const client = await pool.connect();
	await client.query(`UPDATE public.user SET email = $1 WHERE id = $2`, [email, id]);
	client.release();
}

const changePreferences = async (id, preferences) => {
	const client = await pool.connect();
	await client.query(`UPDATE public.user SET preferences = $1 WHERE id = $2`, [preferences, id]);
	client.release();
}

const changeGps = async (id, gps) => {
	const client = await pool.connect();
	await client.query(`UPDATE public.user SET gps = $1 WHERE id = $2`, [gps, id]);
	client.release();
}

const changeLocation = async (id, { lat, lng, city }) => {
	const client = await pool.connect();
	await client.query(`UPDATE public.user SET latitude = $1, longitude = $2, city = $3 WHERE id = $4`, [lat, lng, city, id]);
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

const getData = async (id) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT username, firstname, lastname, email, preferences, bio, gps, latitude, longitude FROM public.user WHERE id = $1`, [id]);
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0];
}

const getInterests = async (id) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT i.name FROM public.user_interest ui JOIN public.interest i ON ui.interest = i.id WHERE ui.user_id = $1`, [id]);
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows;
}

module.exports = { insert, validateEmail, changeUsername, changeEmail, changePreferences, changeGps, changeLocation, changePassword, connect, selectByUsername, selectByEmail, selectById, getData, getInterests };
