const express = require('express');
const router = express.Router();
const { signUp, login, logout, sendVerificationOtp, verifyAccount, sendResetPasswordOtp, resetPassword } = require('../controllers/authController');
const userMiddleware = require('../middlewares/userMiddleware');

//register route
router.post('/signUp', signUp);

//send verification otp route
router.post('/sendVerificationOtp', userMiddleware, sendVerificationOtp);

//verify account route
router.post('/verifyAccount', userMiddleware, verifyAccount);

//login route
router.post('/login', login);

//logout route
router.post('/logout', userMiddleware, logout);

//send reset password otp route
router.post('/sendResetPasswordOtp', sendResetPasswordOtp);

//reset password route
router.post('/resetPassword', resetPassword);

module.exports = router;