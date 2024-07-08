const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { SignupDto, validateSignupDto } = require('../dto/signup.dto');
const { SigninDto, validateSigninDto } = require('../dto/signin.dto');
const { ForgotPasswordDto, validateForgotPasswordDto } = require('../dto/forgotpassword.dto');
const { ChangePasswordDto, validateChangePasswordDto } = require('../dto/changepassword.dto');
const user = require('../db/user');
const mail = require('../config/mail');
const { jwtrequired } = require('../config/jwt');
const router = express.Router();

dotenv.config();

router.get('/isconnected', jwtrequired(), async (req, res) => {
	try
	{
		let res_query = await user.selectById(req.user_id);
		if (!res_query)
			return res.status(400).json({message: 'User not found'});
	}
	catch (err)
	{
		console.log(err);
	}
	return res.status(200).json({message: 'OK'});
});

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
		const decoded = await jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        const userId = decoded.id;
		await user.validateEmail(userId);
	}
	catch (err)
	{
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: 'OK'});
});

router.post('/signin', validateSigninDto(SigninDto), async (req, res) => {
	const { username, password } = req.body;
	try
	{
		let res_query = await user.selectByUsername(username);
		if (!res_query)
			return res.status(400).json({message: 'Invalid username'});
		if (!bcrypt.compareSync(password, res_query.password))
			return res.status(400).json({message: 'Invalid password'});
		if (!res_query.verified)
		{
			await mail.sendVerifyEmail(res_query.email);
			return res.status(403).json({message: 'Email not verified'});
		}
		const accessToken = jwt.sign({ id: res_query.id }, process.env.SECRET_TOKEN_KEY, { expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRATION });
		const refreshToken = jwt.sign({ id: res_query.id }, process.env.SECRET_TOKEN_KEY, { expiresIn: process.env.JWT_REFRESHTOKEN_EXPIRATION });
		res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
		await user.connect(res_query.id, true);
	}
	catch (err)
	{
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.post('/forgotpassword', validateForgotPasswordDto(ForgotPasswordDto), async (req, res) => {
	const { email } = req.body;
	try
	{
		let res_query = await user.selectByEmail(email);
		if (!res_query)
			return res.status(400).json({message: 'Invalid email'});
		await mail.sendForgotPassword(res_query.email);
	}
	catch (err)
	{
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
})

router.post('/changepassword', validateChangePasswordDto(ChangePasswordDto), async (req, res) => {
	const { password } = req.body;
	try
	{
		const { token } = req.query
		const decoded = await jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        const userId = decoded.id;
		await user.changePassword(userId, password);
	}
	catch (err)
	{
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: 'OK'});
});

router.get('/refresh', async (req, res) => {
	if (!req.cookies.refreshToken)
		return res.status(401).json({ message: 'Token not found' });
	try
	{
		const decoded = jwt.verify(req.cookies.refreshToken, process.env.SECRET_TOKEN_KEY);
		req.user_id = decoded.id;
		let res_query = await user.selectById(req.user_id);
		if (!res_query)
			return res.status(400).json({message: 'User not found'});
		const accessToken = jwt.sign({ id: req.user_id }, process.env.SECRET_TOKEN_KEY, { expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRATION });
		const refreshToken = jwt.sign({ id: req.user_id }, process.env.SECRET_TOKEN_KEY, { expiresIn: process.env.JWT_REFRESHTOKEN_EXPIRATION });
		res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
	}
	catch (err)
	{
		return res.status(403).json({message: err});
	}
	return res.status(200).json({message: 'OK'});
});

router.post('/signout', jwtrequired(), async (req, res) => {
	try
	{
		let res_query = await user.selectById(req.user_id);
		if (!res_query)
			return res.status(400).json({message: 'User not found'});
		res.clearCookie('accessToken');
		res.clearCookie('refreshToken');
		await user.connect(res_query.id, false);
	}
	catch (err)
	{
		console.log(err);
	}
	return res.status(200).json({message: 'OK'});
});

module.exports = router;
