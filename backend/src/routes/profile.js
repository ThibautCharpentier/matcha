const express = require('express');
const dotenv = require('dotenv');
const { validateDto } = require('../dto/validatedto');
const { UpdateUsernameDto } = require('../dto/updateusername.dto');
const { UpdateEmailDto } = require('../dto/updateemail.dto');
const { UpdatePreferencesDto } = require('../dto/updatepreferences.dto');
const { UpdateGpsDto } = require('../dto/updategps.dto');
const { UpdateLocationDto } = require('../dto/updatelocation.dto');
const { ChangePasswordDto } = require('../dto/changepassword.dto');
const user = require('../db/user');
const { jwtrequired } = require('../config/jwt');
const router = express.Router();

dotenv.config();

router.patch('/updateusername', jwtrequired(), validateDto(UpdateUsernameDto), async (req, res) => {
	const { username } = req.body;
	try
	{
		let res_query = await user.selectByUsername(username);
		if (res_query && res_query.id != req.user_id)
			return res.status(400).json({message: 'Username already exists'});
		await user.changeUsername(req.user_id, username);
	}
	catch (err)
	{
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.patch('/updateemail', jwtrequired(), validateDto(UpdateEmailDto), async (req, res) => {
	const { email } = req.body;
	try
	{
		let res_query = await user.selectByEmail(email);
		if (res_query && res_query.id != req.user_id)
			return res.status(400).json({message: 'Email already exists'});
		await user.changeEmail(req.user_id, email);
	}
	catch (err)
	{
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.patch('/updatepassword', jwtrequired(), validateDto(ChangePasswordDto), async (req, res) => {
	const { password } = req.body;
	try
	{
		await user.changePassword(req.user_id, password);
	}
	catch (err)
	{
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.patch('/updatepreferences', jwtrequired(), validateDto(UpdatePreferencesDto), async (req, res) => {
	const { preferences } = req.body;
	try
	{
		await user.changePreferences(req.user_id, preferences);
	}
	catch (err)
	{
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.patch('/updategps', jwtrequired(), validateDto(UpdateGpsDto), async (req, res) => {
	const { gps } = req.body;
	try
	{
		await user.changeGps(req.user_id, gps);
	}
	catch (err)
	{
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.patch('/updatelocation', jwtrequired(), validateDto(UpdateLocationDto), async (req, res) => {
	const { lat, lng, city } = req.body;
	try
	{
		await user.changeLocation(req.user_id, { lat, lng, city });
	}
	catch (err)
	{
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

module.exports = router;
