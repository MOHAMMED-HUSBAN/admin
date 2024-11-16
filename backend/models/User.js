// Updated User model (models/User.js)
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  username: { type: String, required: true },
  phonenumber: { type: String },
  image: { type: String },
  provider: { type: String, enum: ['local', 'google', 'facebook'] }
});

module.exports = mongoose.model('User', userSchema);