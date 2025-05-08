const { pool } = require('./db');
const utils = require('../utils/utils')

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

const getReport = async (id, target) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM public.report WHERE user_id = $1 AND target = $2`, [id, target]);
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0];
}

const addReport = async (id, target) => {
	const client = await pool.connect();
	await client.query(`INSERT INTO public.report (user_id, target) VALUES ($1, $2)`, [id, target]);
	client.release();
}

const deleteReport = async (target) => {
	const client = await pool.connect();
	await client.query(`DELETE FROM public.report WHERE target = $1`, [target]);
	client.release();
}

const deleteUser = async (id) => {
	const client = await pool.connect();
	await client.query(`DELETE FROM public.users WHERE id = $1`, [id]);
	client.release();
}

const getAllReports = async () => {
	const client = await pool.connect();
	const res = await client.query(utils.getQueryAllReports())
	client.release();
	if (res.rows.length == 0)
		return [];
	return (res.rows)
}

module.exports = { selectById, selectByEmail, changeCode, getReport, addReport, deleteReport, deleteUser, getAllReports };
