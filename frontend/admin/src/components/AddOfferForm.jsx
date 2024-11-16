import React, { useState } from 'react';
import axios from 'axios';

const AddOfferForm = ({ onOfferAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: 'monthly',
    features: [''],
    image: '',
    category: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeatureField = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeatureField = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // تنظيف المصفوفة من القيم الفارغة
      const cleanedFeatures = formData.features.filter(feature => feature.trim() !== '');
      const dataToSend = {
        ...formData,
        features: cleanedFeatures,
        price: Number(formData.price)
      };

      const response = await axios.post('http://localhost:5000/api/offers', dataToSend);
      setSuccess('تم إضافة العرض بنجاح');
      setError('');
      setFormData({
        name: '',
        description: '',
        price: '',
        duration: 'monthly',
        features: [''],
        image: '',
        category: ''
      });
      if (onOfferAdded) {
        onOfferAdded(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في إضافة العرض');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-right">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg text-right">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-right mb-2">اسم العرض</label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <label className="block text-gray-700 text-right mb-2">المدة</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-right"
            required
          >
            <option value="monthly">شهري</option>
            <option value="quarterly">ربع سنوي</option>
            <option value="yearly">سنوي</option>
          </select>
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

      <div>
        <label className="block text-gray-700 text-right mb-2">المميزات</label>
        {formData.features.map((feature, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => removeFeatureField(index)}
              className="text-red-600 hover:text-red-800"
            >
              حذف
            </button>
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              className="flex-1 p-2 border rounded-lg text-right"
              placeholder="أدخل ميزة"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addFeatureField}
          className="text-blue-600 hover:text-blue-800 text-right block w-full"
        >
          + إضافة ميزة جديدة
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        إضافة العرض
      </button>
    </form>
  );
};

export default AddOfferForm; 