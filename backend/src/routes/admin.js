const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { validateDto } = require('../dto/validatedto');
const { AuthAdminDto } = require('../dto/authadmin.dto');
const { CodeAdminDto } = require('../dto/codeadmin.dto')
const admin = require('../db/admin');
const user = require('../db/user');
const mail = require('../config/mail');
const { TargetDto } = require('../dto/target.dto');
const { jwtadminrequired } = require('../config/jwt');
const router = express.Router();
const path = require('path');
const fs = require('fs');

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
		await admin.changeCode(id, "")
		adminToken = jwt.sign({ id: res_query.id }, process.env.ADMIN_SECRET_TOKEN_KEY, { expiresIn: process.env.JWT_ADMINTOKEN_EXPIRATION });
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: adminToken});
});

router.get('/getallreports', jwtadminrequired(), async (req, res) => {
	let res_query
	try {
		res_query = await admin.getAllReports()
	}
	catch (err) {
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: res_query});
})

router.post('/deletereport', jwtadminrequired(), validateDto(TargetDto), async (req, res) => {
	const { target } = req.body;
	try {
		await admin.deleteReport(target)
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
})

router.post('/confirmreport', jwtadminrequired(), validateDto(TargetDto), async (req, res) => {
	const { target } = req.body
	try {
		let res_query = await admin.getAllReportsToUser(target)
		if (!res_query)
			return res.status(400).json({message: 'Invalid User'});
		res_query = await user.selectById(target)
		if (!res_query)
			return res.status(400).json({message: 'Invalid User'});
		await mail.sendUserDeleted(res_query.email)
		await admin.deleteUser(target)
		const userDir = path.join("uploads", "user" + target);
		if (fs.existsSync(userDir)) {
			fs.rmSync(userDir, { recursive: true, force: true });
		}
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
})

module.exports = router;
