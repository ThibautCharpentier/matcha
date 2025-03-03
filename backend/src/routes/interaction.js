const express = require('express');
const dotenv = require('dotenv');
const user = require('../db/user');
const matchs = require('../db/matchs');
const notif = require('../db/notifications');
const chat = require('../db/chat')
const utils = require('../utils/utils');
const { validateDto } = require('../dto/validatedto');
const { TargetDto } = require('../dto/target.dto.js');
const { jwtrequired } = require('../config/jwt');
const router = express.Router();

dotenv.config();

router.get('/getmatchs', jwtrequired(), async (req, res) => {
	let res_query
	try
	{
		const { sort, filter } = req.query
		let sortValues;
		let filterValues;
		if (sort)
			sortValues = sort.split(' ')
		else
			sortValues = []
		if (filter)
			filterValues = filter.split(' ')
		else
			filterValues = []

		let res_user = await user.selectById(req.user_id);
		res_user.tags = await user.getInterestsId(res_user.id)
		res_user.age = await utils.calculateAge(res_user.birthdate);
		res_query = await matchs.getMatchs(res_user, sortValues, filterValues);
	}
	catch (err)
	{
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: res_query});
});

router.get('/getresearch', jwtrequired(), async (req, res) => {
	let res_query
	try
	{
		const { lat, lng, tags, sort, filter } = req.query
		let sortValues;
		let filterValues;
		let tagsTab;
		let tagsIdTab = [];
		if (sort)
			sortValues = sort.split(' ')
		else
			sortValues = []
		if (filter)
			filterValues = filter.split(' ')
		else
			filterValues = []
		if (tags)
			tagsTab = tags.split(',')
		else
			tagsTab = []

		for (let i = 0; i < tagsTab.length; i++)
		{
			let tmp = await user.getInterestIdbyInterestName(tagsTab[i])
			tagsIdTab.push(tmp)
		}
		let res_user = await user.selectById(req.user_id);
		res_user.age = await utils.calculateAge(res_user.birthdate);
		res_query = await matchs.getResearch(res_user, sortValues, filterValues, tagsIdTab, {lat, lng});
	}
	catch (err)
	{
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: res_query});
});

router.post('/view', jwtrequired(), validateDto(TargetDto), async (req, res) => {
	const { target } = req.body;
	try
	{
		let res = await matchs.getViewProfile(req.user_id, target);
		if (!res)
		{
			await matchs.addViewProfile(req.user_id, target);
			await notif.addNotif(req.user_id, target, "view")
		}
	}
	catch (err)
	{
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.post('/dislike', jwtrequired(), validateDto(TargetDto), async (req, res) => {
	const { target } = req.body;
	try
	{
		let res = await matchs.getDislikeProfile(req.user_id, target);
		if (!res)
		{
			await matchs.addDislikeProfile(req.user_id, target);
			await user.changeFamerating(target)
		}
	}
	catch (err)
	{
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.post('/like', jwtrequired(), validateDto(TargetDto), async (req, res) => {
	const { target } = req.body;
	try
	{
		let res = await matchs.getLikeProfile(req.user_id, target);
		if (!res)
		{
			await matchs.addLikeProfile(req.user_id, target);
			await user.changeFamerating(target)
			await notif.addNotif(req.user_id, target, "like")
			res = await matchs.checkMatch(target, req.user_id)
			if (res)
			{
				await notif.addNotif(req.user_id, target, "match")
				await notif.addNotif(target, req.user_id, "match")
				await chat.addChat(req.user_id, target)
			}
		}
	}
	catch (err)
	{
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

module.exports = router;
