// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/auth.controller');

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
// router.post('/password-reset/request', authController.sendPasswordResetOTP);
// router.post('/password-reset/confirm', authController.resetPassword);

// module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Password reset routes can be added here

module.exports = router;
