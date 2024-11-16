const News = require('../models/newsModel');

const newsController = {
  getAllNews: async (req, res) => {
    try {
      const news = await News.find().sort({ createdAt: -1 });
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createNews: async (req, res) => {
    try {
      const newNews = new News(req.body);
      const savedNews = await newNews.save();
      res.status(201).json(savedNews);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteNews: async (req, res) => {
    try {
      const news = await News.findByIdAndDelete(req.params.id);
      if (!news) {
        return res.status(404).json({ message: 'الخبر غير موجود' });
      }
      res.json({ message: 'تم حذف الخبر بنجاح' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = newsController; 