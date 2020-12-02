const express = require('express');
const router = express.Router();

const authtCtrl = require('./../controllers/authController');

router.post('/register',authtCtrl.register);
router.post('/login', authtCtrl.login);

module.exports = router;