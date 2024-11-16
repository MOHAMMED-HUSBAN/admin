import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        price: Number(formData.price)
      };

      const response = await axios.post('http://localhost:5000/api/products', dataToSend);
      setSuccess('تم إضافة المنتج بنجاح');
      setError('');
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        category: ''
      });
      if (onProductAdded) {
        onProductAdded(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في إضافة المنتج');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-right">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg text-right">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-right mb-2">اسم المنتج</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-right"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-right mb-2">الفئة</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-right"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 text-right mb-2">الوصف</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg text-right"
          rows="3"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 text-right mb-2">السعر (بالدولار $)</label>
        <div className="relative">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-right pl-8"
            required
            min="0"
            step="0.01"
          />
          <span className="absolute left-3 top-2 text-gray-500">$</span>
        </div>
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
        إضافة المنتج
      </button>
    </form>
  );
};

export default AddProductForm; 