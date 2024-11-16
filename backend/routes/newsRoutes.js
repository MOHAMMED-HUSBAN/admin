const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/', newsController.getAllNews);
router.post('/', newsController.createNews);
router.delete('/:id', newsController.deleteNews);

module.exports = router; 