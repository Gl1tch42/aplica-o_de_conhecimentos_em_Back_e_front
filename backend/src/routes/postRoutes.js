const express = require('express');
const router = express.Router();
const postCtrl =require('./../controllers/postController');

router.post('/newpost',postCtrl.creatPost );
router.get('/get', postCtrl.listPost);
router.put('/update/:id', postCtrl.updatePost);
router.delete('/delete/:id', postCtrl.deletePosts);

module.exports = router;