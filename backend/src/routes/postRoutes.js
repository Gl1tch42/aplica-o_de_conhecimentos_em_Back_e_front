const express = require('express');
const router = express.Router();

const postCtrl = require('./../controllers/postController');
const auth = require('./../middlewares/auth');
const authAdmin = require('./../middlewares/authAdmin');
const authMe = require('./../middlewares/authMe')


router.post('/newpost', auth,postCtrl.creatPost );
router.get('/get', postCtrl.listPost);
router.put('/update/:id', auth, authMe, postCtrl.updatePost);
router.delete('/delete/:id', auth, authMe, postCtrl.deletePosts);

module.exports = router;