const WhatWeOffer2 = require('../models/WhatWeOffer2');

const offerController = {
  getAllOffers: async (req, res) => {
    try {
      const offers = await WhatWeOffer2.find().sort({ createdAt: -1 });
      res.json(offers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createOffer: async (req, res) => {
    try {
      const newOffer = new WhatWeOffer2(req.body);
      const savedOffer = await newOffer.save();
      res.status(201).json(savedOffer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteOffer: async (req, res) => {
    try {
      const offer = await WhatWeOffer2.findByIdAndDelete(req.params.id);
      if (!offer) {
        return res.status(404).json({ message: 'العرض غير موجود' });
      }
      res.json({ message: 'تم حذف العرض بنجاح' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = offerController; 