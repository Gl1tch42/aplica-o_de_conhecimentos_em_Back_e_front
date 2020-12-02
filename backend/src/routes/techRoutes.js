const express = require('express');
const router = express.Router();

const techController = require('./../controllers/techController');
const auth = require('./../middlewares/auth');
const authAdmin = require('./../middlewares/authAdmin');

router.post('/newCategory',auth ,authAdmin ,techController.createTech);
router.get('/get', auth,authAdmin ,techController.techList);
router.put('/update/:id',auth ,authAdmin ,techController.updateTech);
router.delete('/delete/:id',auth ,authAdmin ,techController.deleteTech);

module.exports = router;