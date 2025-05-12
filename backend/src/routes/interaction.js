const express = require('express');
const dotenv = require('dotenv');
const user = require('../db/user');
const matchs = require('../db/matchs');
const admin = require('../db/admin');
const notif = require('../db/notifications');
const chat = require('../db/chat')
const utils = require('../utils/utils');
const { validateDto } = require('../dto/validatedto');
const { TargetDto } = require('../dto/target.dto.js');
const { NewMessageDto } = require('../dto/newmessage.dto.js');
const { jwtrequired } = require('../config/jwt');
const router = express.Router();

dotenv.config();

router.get('/getmatchs', jwtrequired(), async (req, res) => {
	let res_query
	try {
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
		res_user.tags = await user.getInterestsId(res_user.id);
		res_user.age = await utils.calculateAge(res_user.birthdate);
		res_query = await matchs.getMatchs(res_user, sortValues, filterValues);
	}
	catch (err) {
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: res_query});
});

router.get('/getresearch', jwtrequired(), async (req, res) => {
	let res_query
	try {
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

		for (let i = 0; i < tagsTab.length; i++) {
			let tmp = await user.getInterestIdbyInterestName(tagsTab[i])
			tagsIdTab.push(tmp)
		}
		let res_user = await user.selectById(req.user_id);
		res_user.age = await utils.calculateAge(res_user.birthdate);
		res_query = await matchs.getResearch(res_user, sortValues, filterValues, tagsIdTab, {lat, lng});
	}
	catch (err) {
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: res_query});
});

router.post('/view', jwtrequired(), validateDto(TargetDto), async (req, res) => {
	const { target } = req.body;
	try {
		const res_query = await matchs.getViewProfile(req.user_id, target)
		const res_query2 = await matchs.getBlockProfile(req.user_id, target)
		const res_query3 = await matchs.getBlockProfile(target, req.user_id)
		if (!res_query && !res_query2 && !res_query3) {
			await matchs.addViewProfile(req.user_id, target);
			await notif.addNotif(req.user_id, target, "view")
		}
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.post('/dislike', jwtrequired(), validateDto(TargetDto), async (req, res) => {
	const { target } = req.body;
	try {
		let res_query = await matchs.checkMatch(target, req.user_id)
		const res_query2 = await matchs.getBlockProfile(req.user_id, target)
		const res_query3 = await matchs.getBlockProfile(target, req.user_id)
		if (res_query && !res_query2 && !res_query3) {
			await matchs.addUnlikeProfile(req.user_id, target);
			await notif.addNotif(req.user_id, target, "unlike")
			if (!chat.getChat(req.user_id, target))
				await chat.deleteChat(req.user_id, target)
			await user.changeFamerating(target)
		}
		else if (!res_query && !res_query2 && !res_query3) {
			res_query = await matchs.getDislikeOrUnlikeProfile(req.user_id, target);
			if (!res_query) {
				res_query = await matchs.getLikeProfile(req.user_id, target)
				if (!res_query)
					await matchs.addDislikeProfile(req.user_id, target);
				else {
					await matchs.addUnlikeProfile(req.user_id, target);
					await notif.addNotif(req.user_id, target, "unlike")
				}
				await user.changeFamerating(target)
			}
		}
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.post('/like', jwtrequired(), validateDto(TargetDto), async (req, res) => {
	const { target } = req.body;
	try {
		let res_query = await matchs.getLikeProfile(req.user_id, target)
		const res_query2 = await matchs.getBlockProfile(req.user_id, target)
		const res_query3 = await matchs.getBlockProfile(target, req.user_id)
		if (!res_query && !res_query2 && !res_query3) {
			await matchs.addLikeProfile(req.user_id, target);
			await user.changeFamerating(target)
			await notif.addNotif(req.user_id, target, "like")
			res_query = await matchs.checkMatch(target, req.user_id)
			if (res_query) {
				await notif.addNotif(req.user_id, target, "match")
				await notif.addNotif(target, req.user_id, "match")
				if (!(await chat.getChat(req.user_id, target)))
					await chat.addChat(req.user_id, target)
			}
		}
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.post('/block', jwtrequired(), validateDto(TargetDto), async (req, res) => {
	const { target } = req.body;
	try {
		const res_query = await matchs.getBlockProfile(req.user_id, target)
		const res_query2 = await matchs.getBlockProfile(target, req.user_id)
		if (!res_query && !res_query2) {
			await matchs.addBlockProfile(req.user_id, target)
			await user.changeFamerating(target)
			if (!chat.getChat(req.user_id, target))
				await chat.deleteChat(req.user_id, target)
		}
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
})
	
router.post('/sendmessage', jwtrequired(), validateDto(NewMessageDto), async (req, res) => {
	const { newMessage, receiver_id, room_id } = req.body;
	
	try {
		await chat.addMessageInChat(room_id, req.user_id, receiver_id, newMessage)
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
})

router.post('/report', jwtrequired(), validateDto(TargetDto), async (req, res) => {
	const { target } = req.body;
	try {
		const res_query = await admin.getReport(req.user_id, target)
		if (!res_query) {
			await admin.addReport(req.user_id, target)
			await matchs.addBlockProfile(req.user_id, target)
			await user.changeFamerating(target)
			if (!chat.getChat(req.user_id, target))
				await chat.deleteChat(req.user_id, target)
		}
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.patch('/sendmessageview', jwtrequired(), async (req, res) => {
	const { room_id } = req.body;

	try {
		await chat.allMessagesView(room_id, req.user_id)
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
})

router.get('/getinteraction', jwtrequired(), async(req, res) => {
	const { id_user } = req.query
	let res_msg = null;
	try {
		const res_query = await matchs.getInteraction(req.user_id, id_user)
		if (res_query)
			res_msg = res_query.action
	}
	catch (err) {
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: res_msg});
})

module.exports = router;
