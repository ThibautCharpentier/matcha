const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const user = require('../db/user');

dotenv.config();

router.get('/listinterests', async (req, res) => {
    let result;
    try {
        result = await user.getAllInterests();
    } catch (err) {
        return res.status(400).json({message: err});
    }
    return res.status(200).json({data: result});
});

module.exports = router;
