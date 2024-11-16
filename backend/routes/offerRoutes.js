const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

router.get('/', offerController.getAllOffers);
router.post('/', offerController.createOffer);
router.delete('/:id', offerController.deleteOffer);

module.exports = router; 