const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  programName: { type: String, required: true },
  programPrice: { type: String, required: true },
  status: { type: String, default: 'pending' },
  registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Registration", registrationSchema);