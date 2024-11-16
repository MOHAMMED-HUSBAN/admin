// models/Subscription.js
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['3months', '2months', '1month']
  },
  price: {
    type: Number,
    required: true
  },
  includesUniform: {
    type: Boolean,
    default: false
  },
  durationInMonths: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);