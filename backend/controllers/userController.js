const User = require('../models/User');

const userController = {
  // جلب جميع المستخدمين
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}, '-password'); // استثناء كلمة المرور من النتائج
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController; 