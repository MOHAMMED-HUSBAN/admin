const Event = require('../models/Event');

const eventController = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find()
        .sort({ date: -1 })
        .populate('participants', 'username email');
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createEvent: async (req, res) => {
    try {
      const newEvent = new Event(req.body);
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'الفعالية غير موجودة' });
      }
      res.json({ message: 'تم حذف الفعالية بنجاح' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = eventController; 