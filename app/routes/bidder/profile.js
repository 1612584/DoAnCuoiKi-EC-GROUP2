const express = require('express');
const profile = express.Router();

const bidderProfileController = require('../../controllers/bidder/profiles/profile');
const bidderFavoriteController = require('../../controllers/bidder/profiles/favorite');
const bidderBiddingController = require('../../controllers/bidder/profiles/bidding');
const bidderWonController = require('../../controllers/bidder/profiles/won');
const bidderReviewController = require('../../controllers/bidder/profiles/review');
const bidderUpgradeController = require('../../controllers/bidder/profiles/upgrade');

const auth = require('../../middleware/auth')
const bidder = require('../../middleware/bidder')

profile.get('/', auth, bidder, bidderProfileController.index);

profile.get('/favorite', auth, bidder, bidderFavoriteController.index);

profile.get('/bidding', auth, bidder, bidderBiddingController.index);

profile.get('/won', auth, bidder, bidderWonController.index);

profile.get('/review', auth, bidder, bidderReviewController.index);

profile.get('/upgrade', auth, bidder, bidderUpgradeController.index);

module.exports = profile;