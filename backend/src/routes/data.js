const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const user = require('../db/user');
const interests = require('../db/interests');

dotenv.config();

router.get('/listinterests', async (req, res) => {
    let result;
    try {
        result = await interests.getAllInterests();
    } catch (err) {
        return res.status(400).json({message: err});
    }
    return res.status(200).json({data: result});
});

module.exports = router;
