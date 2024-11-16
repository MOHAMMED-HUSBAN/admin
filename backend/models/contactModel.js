const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الاسم مطلوب']
  },
  email: {
    type: String,
    required: [true, 'البريد الإلكتروني مطلوب'],
    match: [/^\S+@\S+\.\S+$/, 'يرجى إدخال بريد إلكتروني صحيح']
  },
  phone: {
    type: String,
    required: [true, 'رقم الهاتف مطلوب']
  },
  subject: {
    type: String,
    required: [true, 'الموضوع مطلوب']
  },
  message: {
    type: String,
    required: [true, 'الرسالة مطلوبة']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);