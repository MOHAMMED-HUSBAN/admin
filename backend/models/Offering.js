const mongoose = require('mongoose');

const offeringSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

const Offering = mongoose.model('Offering', offeringSchema);
module.exports = Offering;
