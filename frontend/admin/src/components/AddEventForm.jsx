import React, { useState } from 'react';
import axios from 'axios';

const AddEventForm = ({ onEventAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear().toString(),
    image: '',
    venue: '',
    date: '',
    gender: 'mixed'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/events', formData);
      setSuccess('تم إضافة الفعالية بنجاح');
      setError('');
      setFormData({
        title: '',
        year: new Date().getFullYear().toString(),
        image: '',
        venue: '',
        date: '',
        gender: 'mixed'
      });
      if (onEventAdded) {
        onEventAdded(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في إضافة الفعالية');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-right">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg text-right">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-right mb-2">عنوان الفعالية</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-right"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-right mb-2">السنة</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-right"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 text-right mb-2">المكان</label>
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg text-right"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 text-right mb-2">التاريخ</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg text-right"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 text-right mb-2">النوع</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg text-right"
          required
        >
          <option value="mixed">مختلط</option>
          <option value="male">رجال</option>
          <option value="female">نساء</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 text-right mb-2">رابط الصورة</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg text-right"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        إضافة الفعالية
      </button>
    </form>
  );
};

export default AddEventForm; 