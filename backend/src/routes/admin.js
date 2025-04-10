const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { validateDto } = require('../dto/validatedto');
const { AuthAdminDto } = require('../dto/authadmin.dto');
const { CodeAdminDto } = require('../dto/codeadmin.dto')
const admin = require('../db/admin');
const mail = require('../config/mail');
const router = express.Router();

dotenv.config();

router.post('/auth', validateDto(AuthAdminDto), async (req, res) => {
	const { email } = req.body;
	let res_query
	try {
		res_query = await admin.selectByEmail(email);
		if (!res_query)
			return res.status(400).json({message: 'Invalid email'});
		await mail.sendAdminCode(res_query.id, res_query.email);
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: res_query.id});
});

router.post('/verification', validateDto(CodeAdminDto), async (req, res) => {
	const { id, code } = req.body;
	let adminToken
	try {
		const res_query = await admin.selectById(id);
		if (!res_query)
			return res.status(400).json({message: 'Invalid data'});
		if (res_query.code != code)
			return res.status(400).json({message: 'Invalid code'});
		adminToken = jwt.sign({ id: res_query.id }, process.env.ADMIN_SECRET_TOKEN_KEY, { expiresIn: process.env.JWT_ADMINTOKEN_EXPIRATION });
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: adminToken});
});

module.exports = router;
