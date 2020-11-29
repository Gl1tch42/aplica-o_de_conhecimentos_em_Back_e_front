const express = require('express');
const router = express.Router();
const { blogPost } =require('./../controllers/postController');

router.post('/newpost', blogPost);





module.exports = router