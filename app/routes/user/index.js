const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth');
const userController = require('../../controllers/user')
const loginFbRouter = require('./loginFb')

router.post('/changepassword', auth, userController.changePass)
router.get('/verify/:token', userController.getVerify)
router.get('/forgot', userController.getForgot)
router.post('/forgot', userController.postForgot)
router.get('/reset/:token', userController.getResetPass)
router.post('/reset/:token', userController.postResetPass)
router.get('/profile', userController.getProfile);
router.post('/api/change_name', userController.changeName);
router.post('/api/change_email', userController.changeEmail);

// router.use('/login_fb', loginFbRouter);

module.exports = router; 