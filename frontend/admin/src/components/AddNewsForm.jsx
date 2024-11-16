import React, { useState } from 'react';
import axios from 'axios';

const AddNewsForm = ({ onNewsAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    sections: [{ title: '', items: [''] }]
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleSectionTitleChange = (index, value) => {
    const newSections = [...formData.sections];
    newSections[index].title = value;
    setFormData({ ...formData, sections: newSections });
  };

  const handleItemChange = (sectionIndex, itemIndex, value) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].items[itemIndex] = value;
    setFormData({ ...formData, sections: newSections });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { title: '', items: [''] }]
    });
  };

  const addItem = (sectionIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].items.push('');
    setFormData({ ...formData, sections: newSections });
  };

  const removeSection = (index) => {
    const newSections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: newSections });
  };

  const removeItem = (sectionIndex, itemIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].items = newSections[sectionIndex].items.filter((_, i) => i !== itemIndex);
    setFormData({ ...formData, sections: newSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/news', formData);
      setSuccess('تم إضافة الخبر بنجاح');
      setError('');
      setFormData({
        title: '',
        sections: [{ title: '', items: [''] }]
      });
      if (onNewsAdded) {
        onNewsAdded(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في إضافة الخبر');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-right">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg text-right">{success}</div>}

      <div>
        <label className="block text-gray-700 text-right mb-2">عنوان الخبر</label>
        <input
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg text-right"
          required
        />
      </div>

      {formData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => removeSection(sectionIndex)}
              className="text-red-600 hover:text-red-800"
            >
              حذف القسم
            </button>
            <input
              type="text"
              value={section.title}
              onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)}
              className="w-2/3 p-2 border rounded-lg text-right"
              placeholder="عنوان القسم"
              required
            />
          </div>

          {section.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => removeItem(sectionIndex, itemIndex)}
                className="text-red-600 hover:text-red-800"
              >
                حذف
              </button>
              <input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(sectionIndex, itemIndex, e.target.value)}
                className="flex-1 p-2 border rounded-lg text-right"
                placeholder="محتوى العنصر"
                required
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => addItem(sectionIndex)}
            className="text-blue-600 hover:text-blue-800 text-right block w-full mt-2"
          >
            + إضافة عنصر جديد
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSection}
        className="text-green-600 hover:text-green-800 text-right block w-full"
      >
        + إضافة قسم جديد
      </button>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        إضافة الخبر
      </button>
    </form>
  );
};

export default AddNewsForm; 