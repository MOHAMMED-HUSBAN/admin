const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sections: [
    {
      title: { type: String, required: true },
      items: [{ type: String, required: true }]
    }
  ]
});

const News = mongoose.model('News', newsSchema);
module.exports = News;
