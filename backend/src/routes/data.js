const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { jwtrequired } = require('../config/jwt');
const router = express.Router();
const { pool } = require('../db/db');

dotenv.config();

router.get('/listinterests', async (req, res) => {
	const client = await pool.connect();
    let result;
    console.log('aaaaaaaaaaa');
    try {
        result = await client.query('SELECT name FROM public.interest');
        client.release();
    } catch (err) {
        console.error('Error executing query', err.stack);
        return res.status(400).json({message: 'Error executing query'});
    }
    console.log(result.rows)
    return res.status(200).json({data: result.rows});
});

module.exports = router;