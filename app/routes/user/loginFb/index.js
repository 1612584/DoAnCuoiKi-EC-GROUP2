const express = require('express')
const router = express.Router();
const loginFbController = require('../../../controllers/user/loginFb')

router.get('/auth/facebook', loginFbController.authFb)
router.get('/auth/facebook/callback', loginFbController.authFbCallback)

module.exports = router;
