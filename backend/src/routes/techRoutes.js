const express = require('express');
const router = express.Router();
const techController = require('./../controllers/techController');

router.post('/newCategory',techController.createTech);
router.get('/get',techController.techList);
router.put('/update/:id',techController.updateTech);
router.delete('/delete/:id',techController.deleteTech);

module.exports = router;