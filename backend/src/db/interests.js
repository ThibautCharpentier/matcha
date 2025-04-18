const { pool } = require('./db');

const getInterestIdbyInterestName = async (interestName) => {
	const client = await pool.connect();
	const res = await client.query(`SELECT id FROM public.interest WHERE name = $1`, [interestName])
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows[0].id;
}

const getTabInteretsIdbyTabInterestName = async (interestsName) => {
    const client = await pool.connect();
	const res = await client.query(`SELECT id FROM public.interest WHERE name = ANY($1)`, [interestsName])
	client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows.map(row => row.id);
}

const getAllInterests = async () => {
	const client = await pool.connect();
	const res = await client.query('SELECT name FROM public.interest');
    client.release();
	if (res.rows.length == 0)
		return null;
	return res.rows;
}

module.exports = { getInterestIdbyInterestName, getAllInterests, getTabInteretsIdbyTabInterestName  };
