const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { validateDto } = require('../dto/validatedto');
const { SignupDto } = require('../dto/signup.dto');
const { SigninDto } = require('../dto/signin.dto');
const { ForgotPasswordDto } = require('../dto/forgotpassword.dto');
const { ForgotUsernameDto } = require('../dto/forgotusername.dto');
const { ChangePasswordDto } = require('../dto/changepassword.dto');
const user = require('../db/user');
const mail = require('../config/mail');
const utils = require('../utils/utils');
const { jwtrequired } = require('../config/jwt');
const router = express.Router();

dotenv.config();

router.get('/isconnected', jwtrequired(), async (req, res) => {
	try {
		const res_query = await user.selectById(req.user_id);
		if (!res_query)
			return res.status(400).json({message: 'User not found'});
	}
	catch (err) {
		return res.status(403).json({message: err});
	}
	return res.status(200).json({message: 'OK'});
});

router.post('/signup', validateDto(SignupDto), async (req, res) => {
	const { username, firstname, lastname, email, password } = req.body;
	try {
		if (!utils.validatePassword(password))
			return res.status(400).json({message: 'Invalid password'});
		const hashedPassword = await bcrypt.hash(password, 10);
		let res_query = await user.selectByUsername(username);
		if (res_query)
			return res.status(400).json({message: 'Username already exists'});
		res_query = await user.selectByEmail(email)
		if (res_query)
			return res.status(400).json({message: 'Email already exists'});
		await user.insert(username, firstname, lastname, email, hashedPassword);
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	try {
		await mail.sendVerifyEmail(email);
	}
	catch (err) {
		console.log(err);
	}
	return res.status(201).json({message: 'OK'});
});

router.get('/verifyemail', async (req, res) => {
	let userId;
	try {
		const { token } = req.query
		const decoded = await jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        userId = decoded.id;
	}
	catch (err) {
		return res.status(403).json({message: err});
	}
	try {
		await user.validateEmail(userId);
	}
	catch (err) {
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: 'OK'});
});

router.post('/signin', validateDto(SigninDto), async (req, res) => {
	const { username, password } = req.body;
	try {
		let res_query = await user.selectByUsername(username);
		if (!res_query)
			return res.status(400).json({message: 'Invalid username'});
		if (!bcrypt.compareSync(password, res_query.password))
			return res.status(400).json({message: 'Invalid password'});
		if (!res_query.verified) {
			await mail.sendVerifyEmail(res_query.email);
			return res.status(403).json({message: 'Email not verified'});
		}
		const accessToken = jwt.sign({ id: res_query.id }, process.env.SECRET_TOKEN_KEY, { expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRATION });
		const refreshToken = jwt.sign({ id: res_query.id }, process.env.SECRET_TOKEN_KEY, { expiresIn: process.env.JWT_REFRESHTOKEN_EXPIRATION });
		res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: parseInt(process.env.COOKIE_ACCESSTOKEN_EXPIRATION, 10) });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: parseInt(process.env.COOKIE_REFRESHTOKEN_EXPIRATION, 10) });
		await user.connect(res_query.id, true);
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.post('/forgotpassword', validateDto(ForgotPasswordDto), async (req, res) => {
	const { username } = req.body;
	let res_query;
	try {
		res_query = await user.selectByUsername(username);
		if (!res_query)
			return res.status(400).json({message: 'Invalid username'});
		await mail.sendForgotPassword(res_query.email);
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: res_query.email});
})

router.post('/changepassword', validateDto(ChangePasswordDto), async (req, res) => {
	const { password } = req.body;
	let userId;
	try {
		const { token } = req.query
		const decoded = await jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        userId = decoded.id;
	}
	catch (err) {
		return res.status(403).json({message: err});
	}
	try {
		if (utils.validatePassword(password))
			await user.changePassword(userId, password);
		else
			return res.status(400).json({message: "Invalid Password"});
	}
	catch (err) {
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: 'OK'});
});

router.post('/forgotusername', validateDto(ForgotUsernameDto), async (req, res) => {
	const { email } = req.body;
	try {
		let res_query = await user.selectByEmail(email);
		if (!res_query)
			return res.status(400).json({message: 'Invalid email'});
		await mail.sendForgotUsername(res_query.email, res_query.username);
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: email});
})

router.get('/refresh', async (req, res) => {
	if (!req.cookies?.refreshToken)
		return res.status(401).json({ message: 'Token not found' });
	try {
		const decoded = jwt.verify(req.cookies.refreshToken, process.env.SECRET_TOKEN_KEY);
		req.user_id = decoded.id;
		const res_query = await user.selectById(req.user_id);
		if (!res_query)
			return res.status(400).json({message: 'User not found'});
		const accessToken = jwt.sign({ id: req.user_id }, process.env.SECRET_TOKEN_KEY, { expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRATION });
		const refreshToken = jwt.sign({ id: req.user_id }, process.env.SECRET_TOKEN_KEY, { expiresIn: process.env.JWT_REFRESHTOKEN_EXPIRATION });
		res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: parseInt(process.env.COOKIE_ACCESSTOKEN_EXPIRATION, 10) });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: parseInt(process.env.COOKIE_REFRESHTOKEN_EXPIRATION, 10) });
	}
	catch (err) {
		return res.status(403).json({message: err});
	}
	return res.status(200).json({message: 'OK'});
});

router.post('/signout', jwtrequired(), async (req, res) => {
	try {
		let res_query = await user.selectById(req.user_id);
		if (!res_query)
			return res.status(400).json({message: 'User not found'});
		res.clearCookie('accessToken');
		res.clearCookie('refreshToken');
		await user.connect(res_query.id, false);
	}
	catch (err) {
		console.log(err);
	}
	return res.status(200).json({message: 'OK'});
});

module.exports = router;
