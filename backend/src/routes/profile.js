const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const { validateDto } = require('../dto/validatedto');
const { UpdateBioDto } = require('../dto/updatebio.dto');
const { UpdateGpsDto } = require('../dto/updategps.dto');
const { UpdateLocationDto } = require('../dto/updatelocation.dto');
const { ChangePasswordDto } = require('../dto/changepassword.dto');
const { TargetDto } = require('../dto/target.dto');
const { CompleteProfileDto } = require('../dto/completeprofile.dto');
const { UpdateParametersDto } = require('../dto/updateparameters.dto');
const user = require('../db/user');
const interests = require('../db/interests');
const utils = require('../utils/utils');
const notif = require('../db/notifications');
const mail = require('../config/mail');
const jwt = require('jsonwebtoken');
const upload = require('../config/multer');
const { jwtrequired } = require('../config/jwt');
const router = express.Router();

dotenv.config();

router.get('/verifyemail', async (req, res) => {
	let userId;
	let	userEmail;
	try {
		const { token } = req.query
		const decoded = await jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        userId = decoded.id;
		userEmail = decoded.mail;
	}
	catch (err) {
		return res.status(403).json({message: err});
	}
	try {
		await user.changeEmail(userId, userEmail);
	}
	catch (err) {
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: 'OK'});
});

router.patch('/updategps', jwtrequired(), validateDto(UpdateGpsDto), async (req, res) => {
	const { gps } = req.body;
	try {
		await user.changeGps(req.user_id, gps);
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.patch('/updatelocation', jwtrequired(), validateDto(UpdateLocationDto), async (req, res) => {
	const { lat, lng, city } = req.body;
	try {
		await user.changeLocation(req.user_id, { lat, lng, city });
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.patch('/updateparameters', jwtrequired(), validateDto(UpdateParametersDto), async (req, res) => {
	const { firstname, lastname, gender, preferences, username, email, password, lat, lng, city } = req.body;
	try {
		if (username) {
			const res_query = await user.selectByUsername(username);
			if (res_query && res_query.id != req.user_id)
				return res.status(400).json({message: 'Username already exists'});
			await user.changeUsername(req.user_id, username);
		}
		if (email) {
			const res_query = await user.selectByEmail(email);
			if (res_query && res_query.id != req.user_id)
				return res.status(400).json({message: 'Email already exists'});
			await mail.sendValidateEmail(req.user_id, email);
		}
		if (firstname)
			await user.changeFirstname(req.user_id, firstname);
		if (lastname)
			await user.changeLastname(req.user_id, lastname);
		if (gender)
			await user.changeGender(req.user_id, gender);
		if (preferences)
			await user.changePreferences(req.user_id, preferences);
		if (password)
			await user.changePassword(req.user_id, password);
		if (lat && lng && city)
			await user.changeLocation(req.user_id, { lat, lng, city });
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.get('/getgps', jwtrequired(), async(req, res) => {
	let res_query;
	try {
		res_query = await user.getGps(req.user_id);
	}
	catch (err) {
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: res_query});
})

router.patch('/notifverified', jwtrequired(), async (req, res) => {
	try {
		await notif.verifiedNotifs(req.user_id);
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
});

router.patch('/completeprofile', jwtrequired(), upload.array('pictures'), validateDto(CompleteProfileDto), async (req, res) => {
	const { gender, preferences, birthdate, bio, interest } = req.body;
    const files = req.files;

    try {
        await user.changeGender(req.user_id, gender);
        await user.changePreferences(req.user_id, preferences);
        await user.changeBirthdate(req.user_id, birthdate);
        await user.changeBio(req.user_id, bio);
		const res_query = await user.selectById(req.user_id);
		let imagesToDelete
		if (res_query.pictures)
			imagesToDelete = res_query.pictures;
		else
			imagesToDelete = []
        for (let imagePath of imagesToDelete) {
            const pathToDelete = imagePath;
            if (fs.existsSync(pathToDelete))
                fs.unlinkSync(pathToDelete);
        }
		if (res_query.picture_profile && fs.existsSync(res_query.picture_profile))
            fs.unlinkSync(res_query.picture_profile);
        if (files && files.length > 0) {
            await user.addProfilPicture(req.user_id, files[0].path);
			await user.updatePictures(req.user_id, files.slice(1).map(file => file.path));
		}
		if (interest.length > 0) {
			let idInterests = await interests.getTabInteretsIdbyTabInterestName(interest);
			await user.removeInterestsNotInTab(req.user_id, idInterests);
			await user.addAllUserInterests(req.user_id, idInterests);
		}
    } catch (err) { 
        console.error(err);
        return res.status(400).json({ message: 'Invalid data' });
    }
    return res.status(200).json({ message: 'OK' });
});

router.get('/iscompleteprofile', jwtrequired(), async(req, res) => {
	let res_query;
	try {
		res_query = await user.selectById(req.user_id);
	}
	catch (err) {
		return res.status(400).json({message: err});
	}
    if (res_query.gender == null || res_query.birthdate == null)
        return res.status(200).json({message: false});
	return res.status(200).json({
		message: true,
		id_user: res_query.id
	});
});

router.patch('/updateinterests', jwtrequired(), async(req, res) => {
	const { tabInterests } = req.body;
	let idInterests = []

	try {
		if (tabInterests.length === 0) {
			await user.removeAllInterests(req.user_id);
		}
		else {
			idInterests = await interests.getTabInteretsIdbyTabInterestName(tabInterests);
			await user.removeInterestsNotInTab(req.user_id, idInterests);
			await user.addAllUserInterests(req.user_id, idInterests);
		}
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
})

router.patch('/updatebio', jwtrequired(), validateDto(UpdateBioDto), async(req, res) => {
	const { bio } = req.body;
	try {
		await user.changeBio(req.user_id, bio);
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
})

router.patch('/updatepictures', jwtrequired(), upload.array('pictures'), async (req, res) => {
    const files = req.files;
    const pictureRefs = JSON.parse(req.body.pictureRefs);
	const modifyProfilePicture = pictureRefs[0] === null;

    const finalPictures = [];
    let fileIndex = 0;

    for (let i = 0; i < pictureRefs.length; i++) {
        if (pictureRefs[i] === null) {
            if (fileIndex < files.length) {
                finalPictures.push(files[fileIndex].path);
                fileIndex++;
            } else {
                finalPictures.push(null);
            }
        } else {
            finalPictures.push(pictureRefs[i]);
        }
    }

	try {
        const res_query = await user.selectById(req.user_id);

		let imagesToDelete
		if (res_query.pictures)
			imagesToDelete = res_query.pictures.filter(imagePath => !finalPictures.includes(imagePath) && imagePath !== null);
		else
			imagesToDelete = []

        for (let imagePath of imagesToDelete) {
            const pathToDelete = imagePath;
            if (fs.existsSync(pathToDelete))
                fs.unlinkSync(pathToDelete);
        }
		if (modifyProfilePicture) {
			if (fs.existsSync(res_query.picture_profile))
                fs.unlinkSync(res_query.picture_profile);
			await user.addProfilPicture(req.user_id, finalPictures[0]);
		}
		await user.updatePictures(req.user_id, finalPictures.slice(1));
    } catch (err) {
        console.error(err);
		return res.status(400).json({ message: 'Invalid data' });
    }

    return res.status(200).json({message: 'OK'});
});

router.get('/getprofileuser', jwtrequired(), async(req, res) => {
	const { id_user } = req.query
	let res_query;
	try {
		let res_user = await user.selectById(req.user_id);
		res_query = await user.getProfileUser(id_user, res_user.latitude, res_user.longitude);
	}
	catch (err) {
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: res_query});
})

router.get('/getrecentsviews', jwtrequired(), async(req, res) => {
	let res_query;
	try {
		res_query = await user.getRecentsViews(req.user_id);
	}
	catch (err) {
		return res.status(400).json({message: err});
	}
	return res.status(200).json({message: res_query});
})

router.post('/removenotif', jwtrequired(), validateDto(TargetDto), async(req, res) => {
	const { target } = req.body;
	try {
		await notif.deleteNotif(target);
	}
	catch (err) {
		console.log(err);
		return res.status(400).json({message: 'Invalid data'});
	}
	return res.status(200).json({message: 'OK'});
})

module.exports = router;
