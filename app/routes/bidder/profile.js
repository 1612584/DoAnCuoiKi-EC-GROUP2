const express = require('express');
const profile = express.Router();

const bidderProfileController = require('../../controllers/bidder/profiles/profile');


profile.use('/', bidderProfileController.index);


module.exports = profile;