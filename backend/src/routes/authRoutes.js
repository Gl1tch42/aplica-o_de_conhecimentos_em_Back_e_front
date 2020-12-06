const express = require('express');
const router = express.Router();

const auth = require('./../middlewares/auth');
const authtCtrl = require('./../controllers/authController');

router.post('/register',authtCtrl.register);
router.post('/login', authtCtrl.login);
router.get('/logout', auth, authtCtrl.logout);

module.exports = router;