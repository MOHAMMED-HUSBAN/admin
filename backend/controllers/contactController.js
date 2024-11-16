const Contact = require('../models/contactModel');

const contactController = {
  getAllMessages: async (req, res) => {
    try {
      const messages = await Contact.find().sort({ createdAt: -1 }); // ترتيب تنازلي حسب تاريخ الإنشاء
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = contactController; 