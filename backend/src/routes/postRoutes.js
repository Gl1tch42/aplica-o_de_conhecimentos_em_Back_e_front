const express = require('express');
const router = express.Router();

const postCtrl = require('./../controllers/postController');
const auth = require('./../middlewares/auth');
const authAdmin = require('./../middlewares/authAdmin');


router.post('/newpost',postCtrl.creatPost );
router.get('/get', postCtrl.listPost);
router.put('/update/:id', postCtrl.updatePost);
router.delete('/delete/:id', auth, authAdmin, postCtrl.deletePosts);

module.exports = router;