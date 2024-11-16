const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
}, { timestamps: true });

const Program = mongoose.models.Program || mongoose.model('Program', programSchema);
module.exports = Program;