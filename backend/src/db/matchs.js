const { pool } = require('./db');
const utils = require('../utils/utils')

const getMatchs = async (res_user, sort, filter) => {
	const client = await pool.connect();
	let query = utils.getInitialQueryMatchs(res_user)
	if (filter.length > 0)
		query += utils.getFilterQueryMatchs(filter)
	query += `
		`
	query += utils.getOrderByQueryMatchs(sort)

	const res = await client.query(query, [res_user.tags.array_agg, res_user.latitude, res_user.longitude, res_user.id, res_user.age]);
	client.release();
	if (res.rows.length == 0)
		return [];
	return (res.rows)
}

const getResearch = async (res_user, sort, filter, tags, {lat, lng}) => {
	const client = await pool.connect();
	let query = utils.getInitialQueryMatchs(res_user)
	if (filter.length > 0)
		query += utils.getFilterQueryMatchs(filter)
	query += `
		`
	query += utils.getOrderByQueryMatchs(sort)

	const res = await client.query(query, [tags, lat, lng, res_user.id, res_user.age]);
	client.release();
	if (res.rows.length == 0)
		return [];
	return (res.rows)
}

const checkMatch = async (user1, user2) => {
	const client = await pool.connect()
	let res = await client.query(`SELECT * FROM public.interaction WHERE user_id = $1 AND target = $2 AND action = 'like'`, [user1, user2])
	client.release();
	if (res.rows.length == 0)
		return null
	const client2 = await pool.connect()
	res = await client2.query(`SELECT * FROM public.interaction WHERE user_id = $1 AND target = $2 AND action = 'like'`, [user2, user1])
	client2.release();
	if (res.rows.length == 0)
		return null
	return res.rows;
}

const addViewProfile = async (id, target) => {
	const client = await pool.connect();
	await client.query(`INSERT INTO public.view (user_id, target) VALUES ($1, $2)`, [id, target]);
	client.release();
}

const getViewProfile = async (id, target) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM public.view WHERE user_id = $1 AND target = $2`, [id, target]);
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0];
}

const addDislikeProfile = async (id, target) => {
	const client = await pool.connect();
	const hasLine = await getInteraction(id, target)
	if (!hasLine)
		await client.query(`INSERT INTO public.interaction (user_id, target, action) VALUES ($1, $2, 'dislike')`, [id, target]);
	else
		await client.query(`UPDATE public.interaction SET action = 'dislike' WHERE user_id = $1 AND target = $2`, [id, target]);
	client.release();
}

const addUnlikeProfile = async (id, target) => {
	const client = await pool.connect();
	const hasLine = await getInteraction(id, target)
	if (!hasLine)
		await client.query(`INSERT INTO public.interaction (user_id, target, action) VALUES ($1, $2, 'unlike')`, [id, target]);
	else
		await client.query(`UPDATE public.interaction SET action = 'unlike' WHERE user_id = $1 AND target = $2`, [id, target]);
	client.release();
}

const getDislikeOrUnlikeProfile = async (id, target) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM public.interaction WHERE user_id = $1 AND target = $2 AND (action = 'dislike' OR action = 'unlike')`, [id, target]);
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0];
}

const addLikeProfile = async (id, target) => {
	const client = await pool.connect();
	const hasLine = await getInteraction(id, target)
	if (!hasLine)
		await client.query(`INSERT INTO public.interaction (user_id, target, action) VALUES ($1, $2, 'like')`, [id, target]);
	else
		await client.query(`UPDATE public.interaction SET action = 'like' WHERE user_id = $1 AND target = $2`, [id, target]);
	client.release();
}

const getLikeProfile = async (id, target) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM public.interaction WHERE user_id = $1 AND target = $2 AND action = 'like'`, [id, target]);
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0];
}

const addBlockProfile = async (id, target) => {
	const client = await pool.connect();
	const hasLine = await getInteraction(id, target)
	if (!hasLine)
		await client.query(`INSERT INTO public.interaction (user_id, target, action) VALUES ($1, $2, 'block')`, [id, target]);
	else
		await client.query(`UPDATE public.interaction SET action = 'block' WHERE user_id = $1 AND target = $2`, [id, target]);
	client.release();
}

const getInteraction = async (id, target) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM public.interaction WHERE user_id = $1 AND target = $2`, [id, target]);
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0];
}

const getBlockProfile = async (id, target) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT * FROM public.interaction WHERE user_id = $1 AND target = $2 AND action = 'block'`, [id, target]);
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0];
}

module.exports = { getMatchs, getResearch, checkMatch, addViewProfile, getViewProfile, addDislikeProfile, getDislikeOrUnlikeProfile, addLikeProfile, getLikeProfile, addBlockProfile, getInteraction, addUnlikeProfile, getBlockProfile }
