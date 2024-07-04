const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { SignupDto, validateSignupDto } = require('../dto/signup.dto');
const user = require('../db/user');
const mail = require('../config/mail');
const router = express.Router();

dotenv.config();

router.post('/signup', validateSignupDto(SignupDto), async (req, res) => {
	const { username, firstname, lastname, email, password } = req.body;
	try
	{
		const hashedPassword = await bcrypt.hash(password, 10);
		let res_query = await user.selectByUsername(username);
		if (res_query)
			return res.status(400).json({message: 'Username already exists'});
		res_query = await user.selectByEmail(email)
		if (res_query)
			return res.status(400).json({message: 'Email already exists'});
		await user.insert(username, firstname, lastname, email, hashedPassword);
	}
	catch (err)
	{
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	try
	{
		await mail.sendVerifyEmail(email);
	}
	catch (err)
	{
		console.log(err);
	}
	return res.status(201).json({message: 'OK'});
});

router.get('/verifyemail', async (req, res) => {
	try
	{
		const { token } = req.query
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.id;
		await user.validateEmail(userId);
	}
	catch (err)
	{
		console.log(err);
		return res.status(400).json({message: 'Invalid or expired link'});
	}
	return res.status(200).json({message: 'OK'});
})

module.exports = router;
